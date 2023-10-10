import { createContext, useEffect, useReducer } from "react";
import { Recipe, RecipeCollection, RecipeCollectionItem, Response } from "../../../../data/types";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { ResponsePage } from "../../../../data/utilTypes";
import { scrollIntoRecipesPage } from "../../../../utils/RecipeSearchUtils";
import { ApiRequestSendManager } from "../../../../utils/ApiRequestSendManager";

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

const RECIPES_PAGE_SIZE = 4;

const searchRequestManager = ApiRequestSendManager();

export const RecipeCollectionListContext = createContext<contextStateModel>({});

export const RecipeCollectionListDispatchContext = createContext<(action:ReducerActionProps) => any>((action:ReducerActionProps) => {});

export const RecipeCollectionListContextProvider = ({ children }: any) => {
    const [contextState, dispatch]: [contextStateModel, (action:ReducerActionProps) => any] = useReducer(collectionsReducer, {});

    function getSavedCollections() {
        recipeCollectionsApi.getUserRecipeCollections((response) => dispatch({ type: RecipeCollectionListContextType.SetSavedCollectionsList, value: response.value }))
    }

    function getCollectionRecipes(recipeCollectionId: string, pageNum: number, pageSize: number, onResponseCallback = onCollectionRecipesResponse) {
        searchRequestManager.nextAndLock(() => {
            recipeCollectionsApi.getRecipeCollectionRecipes(recipeCollectionId, { pageNum, pageSize }, onResponseCallback, searchRequestManager.unlock);
        })
    }

    function onCollectionRecipesResponse(response: Response<ResponsePage<RecipeCollectionItem>>): any {
        searchRequestManager.unlock();
        const responsePage: ResponsePage<any> = response.value
        responsePage.content = responsePage.content.map(mapRecipeCollectionItemToRecipe);
        dispatch({ type: RecipeCollectionListContextType.OnRecipesPageLoad, recipesPage: responsePage });
    }

    function mapRecipeCollectionItemToRecipe(recipeCollectionItem: RecipeCollectionItem): Recipe {
        return recipeCollectionItem.recipe;
    }

    function selectDefaultCollection(contextState: contextStateModel, collections: RecipeCollection[]) {
        if (!contextState.activeCollectionId) {
            setTimeout(() => {
                collections.filter(collection => collection.name === 'Favourite')
                    .forEach((collection) => dispatch({ type: RecipeCollectionListContextType.CollectionSelect, activeCollectionId: collection.id }));
            })
        };
    }

    function loadBetweenPage(contextState: contextStateModel, nextPages: Recipe[][], nextPage: any) {
        const page = nextPage.number - 1
        if (page > 0 && typeof nextPages[page] === 'undefined') {
            getCollectionRecipes(contextState.activeCollectionId || "", page, RECIPES_PAGE_SIZE, onGetBetweenRecipesByFilterResponse)
            return;
        }
    }

    function onGetBetweenRecipesByFilterResponse(response: Response<ResponsePage<RecipeCollectionItem>>) {
        searchRequestManager.unlock();
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
                return {
                    ...contextState,
                };
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
    useEffect(() => {
        getSavedCollections();
    }, [])

    return (
        <RecipeCollectionListContext.Provider value={contextState}>
            <RecipeCollectionListDispatchContext.Provider value={dispatch}>
                {children}
            </RecipeCollectionListDispatchContext.Provider>
        </RecipeCollectionListContext.Provider>
    )
}