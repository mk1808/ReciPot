import { createContext, useEffect, useReducer } from "react";

import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { Recipe, RecipeCollection, RecipeCollectionItem, Response } from "../../../../data/types";
import { ResponsePage } from "../../../../data/utilTypes";
import useRequestSendManager from "../../../../hooks/useRequestSendManager";
import { scrollIntoRecipesPage } from "../../../recipe/filter/utils/RecipeSearchUtils";

type contextStateModel = {
    collections?: RecipeCollection[],
    recipesInCollection?: Recipe[][],
    activeCollectionId?: string,
    currentPage?: { totalPages: number, number: number, totalElements: number },
    isLoaded?: boolean
};

type ReducerActionProps = {
    type: RecipeCollectionListContextType,
    activeCollectionId?: any,
    refreshCollectionsList?: any,
    value?: any,
    recipesPage?: any
}

export enum RecipeCollectionListContextType {
    CollectionSelect = "collectionSelect",
    RefreshCollectionsList = "refreshCollectionsList",
    SetSavedCollectionsList = "setSavedCollectionsList",
    OnRecipesPageLoad = "onRecipesPageLoad",
    OnBetweenRecipePageLoad = "onBetweenRecipePageLoad",
    LoadRecipesPage = "loadRecipesPage"
};

const RECIPES_PAGE_SIZE = 12;

export const RecipeCollectionListContext = createContext<contextStateModel>({});

export const RecipeCollectionListDispatchContext = createContext<(action: ReducerActionProps) => any>((action: ReducerActionProps) => { });

export const RecipeCollectionListContextProvider = ({ children }: any) => {
    const [nextAndLock, unlock] = useRequestSendManager();
    const [contextState, dispatch]: [contextStateModel, (action: ReducerActionProps) => any] = useReducer(collectionsReducer, {});

    useEffect(() => {
        getSavedCollections();
    }, [])

    function collectionsReducer(contextState: contextStateModel, action: ReducerActionProps): contextStateModel {
        switch (action.type) {
            case RecipeCollectionListContextType.CollectionSelect: {
                getCollectionRecipes(action.activeCollectionId || "", 0, RECIPES_PAGE_SIZE);
                return {
                    ...contextState,
                    recipesInCollection: [],
                    activeCollectionId: action.activeCollectionId,
                    isLoaded: false
                };
            }
            case RecipeCollectionListContextType.RefreshCollectionsList: {
                getSavedCollections();
                return contextState;
            }
            case RecipeCollectionListContextType.SetSavedCollectionsList: {
                selectDefaultCollection(contextState, action.value);
                return {
                    ...contextState,
                    collections: action.value
                };
            }
            case RecipeCollectionListContextType.OnRecipesPageLoad: {
                const recipesInCollection = [...(contextState?.recipesInCollection || [])]
                recipesInCollection[action.recipesPage.number] = action.recipesPage.content
                loadBetweenPage(contextState, recipesInCollection, action.recipesPage)
                return {
                    ...contextState,
                    recipesInCollection: recipesInCollection,
                    currentPage: action.recipesPage,
                    isLoaded: true
                };
            }
            case RecipeCollectionListContextType.OnBetweenRecipePageLoad: {
                const recipesInCollection = [...(contextState?.recipesInCollection || [])];
                recipesInCollection[action.recipesPage.number] = action.recipesPage.content.map(mapRecipeCollectionItemToRecipe);
                loadBetweenPage(contextState, recipesInCollection, action.recipesPage);
                focusOnRecipesPage(contextState.currentPage?.number);
                return {
                    ...contextState,
                    recipesInCollection: recipesInCollection
                };
            }
            case RecipeCollectionListContextType.LoadRecipesPage: {
                getCollectionRecipes(contextState.activeCollectionId || "", action.value, RECIPES_PAGE_SIZE);
                return {
                    ...contextState
                };
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    function getSavedCollections() {
        recipeCollectionsApi.getUserRecipeCollections((response) => dispatch({
            type: RecipeCollectionListContextType.SetSavedCollectionsList,
            value: response.value
        }));
    }

    function getCollectionRecipes(recipeCollectionId: string, pageNum: number, pageSize: number, onResponseCallback = onCollectionRecipesResponse) {
        nextAndLock(() => {
            recipeCollectionsApi.getRecipeCollectionRecipes(recipeCollectionId, { pageNum, pageSize }, onResponseCallback, unlock);
        })
    }

    function onCollectionRecipesResponse(response: Response<ResponsePage<RecipeCollectionItem>>): any {
        unlock();
        const responsePage: ResponsePage<any> = response.value
        responsePage.content = responsePage.content.map(mapRecipeCollectionItemToRecipe);
        dispatch({
            type: RecipeCollectionListContextType.OnRecipesPageLoad,
            recipesPage: responsePage
        });
    }

    function mapRecipeCollectionItemToRecipe(recipeCollectionItem: RecipeCollectionItem): Recipe {
        return recipeCollectionItem.recipe;
    }

    function selectDefaultCollection(contextState: contextStateModel, collections: RecipeCollection[]) {
        if (!contextState.activeCollectionId) {
            setTimeout(() => onSelectDefaultCollection(collections));
        };
    }

    function onSelectDefaultCollection(collections: RecipeCollection[]) {
        collections.filter(collection => collection.name === 'Favourite').forEach(dispatchCollectionSelect);
    }

    function dispatchCollectionSelect(collection: RecipeCollection) {
        dispatch({ type: RecipeCollectionListContextType.CollectionSelect, activeCollectionId: collection.id })
    }

    function loadBetweenPage(contextState: contextStateModel, nextPages: Recipe[][], nextPage: any) {
        const page = nextPage.number - 1
        if (page > 0 && typeof nextPages[page] === 'undefined') {
            getCollectionRecipes(contextState.activeCollectionId || "", page, RECIPES_PAGE_SIZE, onGetBetweenRecipesByFilterResponse)
            return;
        }
    }

    function onGetBetweenRecipesByFilterResponse(response: Response<ResponsePage<RecipeCollectionItem>>) {
        unlock();
        dispatch({
            type: RecipeCollectionListContextType.OnBetweenRecipePageLoad,
            recipesPage: response.value
        });
    }

    function focusOnRecipesPage(page?: number) {
        setTimeout(() => {
            scrollIntoRecipesPage(page || 0);
        }, 400)
    }

    return (
        <RecipeCollectionListContext.Provider value={contextState}>
            <RecipeCollectionListDispatchContext.Provider value={dispatch}>
                {children}
            </RecipeCollectionListDispatchContext.Provider>
        </RecipeCollectionListContext.Provider>
    )
}