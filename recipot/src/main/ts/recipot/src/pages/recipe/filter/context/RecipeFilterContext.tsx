import { createContext, useEffect, Context, useReducer, useRef } from "react";
import { Recipe, RecipeFilter, Response } from "../../../../data/types";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import recipesApi from "../../../../api/RecipesApi";
import { ResponsePage } from "../../../../data/utilTypes";
import { buildRecipeSearchDto } from "../../../../utils/RecipeSearchUtils";

type contextStateModel = {
    savedFilters?: RecipeFilter[],
    recipesPages?: Recipe[][],
    activeRecipeFilterId?: string,
    currentPage?: { totalPages: number, number: number },
    recipesFilterForm?: any
};

const RECIPES_PAGE_SIZE = 24;

export const RecipeFilterContext: Context<contextStateModel> = createContext({});

export const RecipeFilterDispatchContext = createContext<Function>(() => { });

export const RecipeFilterContextContextProvider = ({ children }: any) => {
    const [contextState, dispatch]: [contextStateModel, Function] = useReducer(recipeFilterReducer, {});

    function getSavedFilters() {
        savedRecipeFiltersApi.getRecipeFilters((response) => dispatch({ type: 'setSavedFiltersList', value: response.value }));
    }

    function getRecipesByFilter(recipesFilterForm: any, pageNum: number, pageSize: number) {
        recipesApi.search(buildRecipeSearchDto(recipesFilterForm), { pageNum, pageSize }, onGetRecipesByFilterResponse)
    }

    function onGetRecipesByFilterResponse(response: Response<ResponsePage<Recipe>>) {
        dispatch({
            type: 'onRecipePageLoad',
            recipesPage: response.value
        });
    }

    function getSelectedFilterFormValue(contextState: contextStateModel, activeRecipeFilterId: string) {
        const filterId = contextState.savedFilters?.map(filter => filter.id).indexOf(activeRecipeFilterId) || -1
        if (filterId >= 0) {
            return JSON.parse(contextState.savedFilters ? contextState.savedFilters[filterId].value : "")
        }
        return contextState.recipesFilterForm
    }

    function recipeFilterReducer(contextState: contextStateModel, action: any): contextStateModel {
        switch (action.type) {
            case 'filterSelect': {
                //TODO: POST recipes search with saved filter value
                return {
                    ...contextState,
                    activeRecipeFilterId: action.activeRecipeFilterId,
                    //recipesPages: getTempRecipesPage(),
                    //currentPage: getTempCurrentPage(0),
                    recipesFilterForm: getSelectedFilterFormValue(contextState, action.activeRecipeFilterId)
                };
            }
            case 'refreshFiltersList': {
                getSavedFilters();
                return contextState;
            }
            case 'setSavedFiltersList': {
                return {
                    ...contextState,
                    savedFilters: action.value
                };
            }
            case 'filter': {
                getRecipesByFilter(contextState.recipesFilterForm || {}, 0, RECIPES_PAGE_SIZE);
                return {
                    ...contextState
                };
            }
            case 'filterFormChange': {
                return {
                    ...contextState,
                    recipesFilterForm: {
                        ...contextState.recipesFilterForm,
                        [action.fieldName]: action.value
                    }
                }
            }
            case 'onRecipePageLoad': {
                const recipesPages = [...(contextState?.recipesPages || [])]
                recipesPages[action.recipesPage.number] = action.recipesPage.content
                return {
                    ...contextState,
                    recipesPages: recipesPages,
                    currentPage: action.recipesPage.content
                };
            }
            case 'loadRecipesPage': {
                //TODO: POST recipes search + page from action.value
                return {
                    ...contextState,
                    //recipesPages: getTempRecipesPage(),
                    //currentPage: getTempCurrentPage(action.value)
                };
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    useEffect(() => {
        dispatch({ type: 'filter' })
        dispatch({ type: 'refreshFiltersList' })
    }, [])

    return (
        <RecipeFilterContext.Provider value={contextState}>
            <RecipeFilterDispatchContext.Provider value={dispatch}>
                {children}
            </RecipeFilterDispatchContext.Provider>
        </RecipeFilterContext.Provider>
    )
}