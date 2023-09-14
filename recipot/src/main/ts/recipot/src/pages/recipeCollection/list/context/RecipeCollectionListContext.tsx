import { createContext, useEffect, Context, useReducer } from "react";
import { Recipe, RecipeCollection, RecipeCollectionItem, Response } from "../../../../data/types";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { ResponsePage } from "../../../../data/utilTypes";

type contextStateModel = { collections?: RecipeCollection[], recipesInCollection?: Recipe[][], activeCollectionId?: string, currentPage?: { totalPages: number, number: number } };

const RECIPES_PAGE_SIZE = 4;

export const RecipeCollectionListContext: Context<contextStateModel> = createContext({});

export const RecipeCollectionListDispatchContext = createContext<Function>(() => { });

export const RecipeCollectionListContextProvider = ({ children }: any) => {
    const [contextState, dispatch]: [contextStateModel, Function] = useReducer(collectionsReducer, {});

    function getSavedCollections() {
        recipeCollectionsApi.getUserRecipeCollections((response) => dispatch({ type: 'setSavedCollectionsList', value: response.value }))
    }

    function getCollectionRecipes(recipeCollectionId: string, pageNum: number, pageSize: number) {
        recipeCollectionsApi.getRecipeCollectionRecipes(recipeCollectionId, { pageNum, pageSize }, onCollectionRecipesResponse);
    }

    function onCollectionRecipesResponse(response: Response<ResponsePage<RecipeCollectionItem>>): any {
        const responsePage: ResponsePage<any> = response.value
        responsePage.content = responsePage.content.map((collectionItem: RecipeCollectionItem) => collectionItem.recipe);
        dispatch({ type: 'onRecipesPageLoad', recipesPage: responsePage });
    }


    function collectionsReducer(contextState: contextStateModel, action: any): contextStateModel {
        switch (action.type) {
            case 'collectionSelect': {
                getCollectionRecipes(action.activeCollectionId || "", 0, RECIPES_PAGE_SIZE);
                return {
                    ...contextState,
                    recipesInCollection: [],
                    activeCollectionId: action.activeCollectionId
                };
            }
            case 'refreshCollectionsList': {
                getSavedCollections();
                return {
                    ...contextState,
                };
            }
            case 'setSavedCollectionsList': {
                return {
                    ...contextState,
                    collections: action.value
                };
            }
            case 'onRecipesPageLoad': {
                const recipesInCollection = [...(contextState?.recipesInCollection || [])]
                recipesInCollection[action.recipesPage.number] = action.recipesPage.content
                return {
                    ...contextState,
                    recipesInCollection: recipesInCollection,
                    currentPage: action.recipesPage
                };
            }
            case 'loadRecipesPage': {
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