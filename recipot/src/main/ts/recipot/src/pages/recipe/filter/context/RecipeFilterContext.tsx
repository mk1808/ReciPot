import { createContext, useEffect, Context, useReducer } from "react";
import { Recipe, RecipeFilter, Response } from "../../../../data/types";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import recipesApi from "../../../../api/RecipesApi";
import { ResponsePage } from "../../../../data/utilTypes";
import { buildRecipeSearchDto, scrollIntoRecipesPage, updatePageUrl } from "../../../../utils/RecipeSearchUtils";
import { ApiRequestSendManager } from "../../../../utils/ApiRequestSendManager";
import { useSearchParams } from "react-router-dom";

type contextStateModel = {
    savedFilters?: RecipeFilter[],
    recipesPages?: Recipe[][],
    activeRecipeFilterId?: string,
    currentPage?: { totalPages: number, number: number, totalElements: number },
    recipesFilterForm?: any,
    isLoaded?: boolean
};

const RECIPES_PAGE_SIZE = 4;
const searchRequestManager = ApiRequestSendManager();

export const RecipeFilterContext: Context<contextStateModel> = createContext({});

export const RecipeFilterDispatchContext = createContext<Function>(() => { });

export const RecipeFilterContextContextProvider = ({ children }: any) => {
    const [contextState, dispatch]: [contextStateModel, Function] = useReducer(recipeFilterReducer, {});
    const [searchParams,] = useSearchParams();

    function getSavedFilters() {
        savedRecipeFiltersApi.getRecipeFilters((response) => dispatch({ type: 'setSavedFiltersList', value: response.value }));
    }

    function getRecipesByFilter(recipesFilterForm: any, pageNum: number, pageSize: number, responseCallback: any) {
        searchRequestManager.nextAndLock(() => {
            recipesApi.search(buildRecipeSearchDto(recipesFilterForm), { pageNum, pageSize }, responseCallback, searchRequestManager.unlock);
        })
    }

    function updateFilterPageUrl(recipesFilterForm: any) {
        updatePageUrl(recipesFilterForm)
    }

    function onGetRecipesByFilterResponse(response: Response<ResponsePage<Recipe>>) {
        searchRequestManager.unlock();
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

    function loadBetweenPage(contextState: contextStateModel, nextPages: Recipe[][], nextPage: any) {
        const page = nextPage.number - 1
        if (page > 0 && typeof nextPages[page] === 'undefined') {
            getRecipesByFilter(contextState.recipesFilterForm || {}, page, RECIPES_PAGE_SIZE, onGetBetweenRecipesByFilterResponse);
            return;
        }
    }

    function onGetBetweenRecipesByFilterResponse(response: Response<ResponsePage<Recipe>>) {
        searchRequestManager.unlock();
        dispatch({
            type: 'onBetweenRecipePageLoad',
            recipesPage: response.value
        });
    }

    function focusOnRecipesPage(page?: number) {
        setTimeout(() => {
            scrollIntoRecipesPage(page || 0);
        }, 400)
    }

    function recipeFilterReducer(contextState: contextStateModel, action: any): contextStateModel {
        switch (action.type) {
            case 'filterSelect': {
                const newRecipesFilterFormState = getSelectedFilterFormValue(contextState, action.activeRecipeFilterId)
                getRecipesByFilter(newRecipesFilterFormState || {}, 0, RECIPES_PAGE_SIZE, onGetRecipesByFilterResponse);
                updateFilterPageUrl(newRecipesFilterFormState);
                return {
                    ...contextState,
                    activeRecipeFilterId: action.activeRecipeFilterId,
                    recipesPages: [],
                    recipesFilterForm: newRecipesFilterFormState,
                    isLoaded: false
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
                getRecipesByFilter(contextState.recipesFilterForm || {}, 0, RECIPES_PAGE_SIZE, onGetRecipesByFilterResponse);
                updateFilterPageUrl(contextState.recipesFilterForm);
                return {
                    ...contextState,
                    recipesPages: [],
                    isLoaded: false
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
                const recipesPages = [...(contextState?.recipesPages || [])];
                recipesPages[action.recipesPage.number] = action.recipesPage.content;
                loadBetweenPage(contextState, recipesPages, action.recipesPage);

                return {
                    ...contextState,
                    recipesPages: recipesPages,
                    currentPage: action.recipesPage,
                    isLoaded: true
                };
            }
            case 'onBetweenRecipePageLoad': {
                const recipesPages = [...(contextState?.recipesPages || [])];
                recipesPages[action.recipesPage.number] = action.recipesPage.content;
                loadBetweenPage(contextState, recipesPages, action.recipesPage);
                focusOnRecipesPage(contextState.currentPage?.number);
                return {
                    ...contextState,
                    recipesPages: recipesPages
                };
            }
            case 'loadRecipesPage': {
                getRecipesByFilter(contextState.recipesFilterForm || {}, action.value, RECIPES_PAGE_SIZE, onGetRecipesByFilterResponse);
                return {
                    ...contextState
                };
            }
            case 'clearFilterForm': {
                return {
                    ...contextState,
                    recipesFilterForm: {
                        recipesSort: contextState.recipesFilterForm.recipesSort
                    }
                };
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    useEffect(() => {
        getFilterFromParams();
    }, [searchParams])

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