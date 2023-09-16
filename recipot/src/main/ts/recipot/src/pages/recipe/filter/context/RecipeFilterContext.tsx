import { createContext, useEffect, Context, useReducer } from "react";
import { Recipe, RecipeFilter, Response } from "../../../../data/types";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import recipesApi from "../../../../api/RecipesApi";
import { ResponsePage } from "../../../../data/utilTypes";
import { buildRecipeSearchDto, updatePageUrl } from "../../../../utils/RecipeSearchUtils";

type contextStateModel = {
    savedFilters?: RecipeFilter[],
    recipesPages?: Recipe[][],
    activeRecipeFilterId?: string,
    currentPage?: { totalPages: number, number: number },
    recipesFilterForm?: any
};

const RECIPES_PAGE_SIZE = 4;

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

    function updateFilterPageUrl(recipesFilterForm: any) {
        updatePageUrl(recipesFilterForm)
    }

    function onGetRecipesByFilterResponse(response: Response<ResponsePage<Recipe>>) {
        dispatch({
            type: 'onRecipePageLoad',
            recipesPage: response.value
        });
    }

    function getSelectedFilterFormValue(contextState: contextStateModel, activeRecipeFilterId: string) {
        const filterId = Number(contextState.savedFilters?.map(filter => filter.id).indexOf(activeRecipeFilterId))
        if (filterId >= 0) {
            return JSON.parse(contextState.savedFilters ? contextState.savedFilters[filterId].value : "")
        }
        return contextState.recipesFilterForm
    }

    function recipeFilterReducer(contextState: contextStateModel, action: any): contextStateModel {
        switch (action.type) {
            case 'filterSelect': {
                const newRecipesFilterFormState = getSelectedFilterFormValue(contextState, action.activeRecipeFilterId)
                getRecipesByFilter(newRecipesFilterFormState || {}, 0, RECIPES_PAGE_SIZE);
                updateFilterPageUrl(newRecipesFilterFormState);
                return {
                    ...contextState,
                    activeRecipeFilterId: action.activeRecipeFilterId,
                    recipesPages: [],
                    recipesFilterForm: newRecipesFilterFormState
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
                updateFilterPageUrl(contextState.recipesFilterForm);
                return {
                    ...contextState,
                    recipesPages: []
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
                    currentPage: action.recipesPage
                };
            }
            case 'loadRecipesPage': {
                getRecipesByFilter(contextState.recipesFilterForm || {}, action.value, RECIPES_PAGE_SIZE);
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
        getFilterFromParams();
        dispatch({ type: 'refreshFiltersList' })
    }, [])

    function getFilterFromParams() {
        setTimeout(() => {
            const queryParams: any = new URLSearchParams(window.location.search)
            for (const [fieldName, value] of queryParams) {
                let parsedValue = value;
                try {
                    parsedValue = JSON.parse(value)
                } catch (e) { }

                dispatch({
                    type: "filterFormChange",
                    fieldName,
                    value: parsedValue
                })
            }
            setTimeout(() => {
                dispatch({ type: 'filter' })
            }, 100)
        }, 100)
    }

    return (
        <RecipeFilterContext.Provider value={contextState}>
            <RecipeFilterDispatchContext.Provider value={dispatch}>
                {children}
            </RecipeFilterDispatchContext.Provider>
        </RecipeFilterContext.Provider>
    )
}