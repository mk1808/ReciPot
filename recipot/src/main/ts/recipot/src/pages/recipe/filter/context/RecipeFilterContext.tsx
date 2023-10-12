import { createContext, useEffect, useReducer } from "react";
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

type ReducerActionProps = {
    type: RecipeFilterContextType,
    activeRecipeFilterId?: any,
    value?: any,
    fieldName?: any,
    recipesPage?: any
};

export enum RecipeFilterContextType {
    FilterSelect = "filterSelect",
    RefreshFiltersList = "refreshFiltersList",
    SetSavedFiltersList = "setSavedFiltersList",
    Filter = "filter",
    FilterFormChange = "filterFormChange",
    OnRecipePageLoad = "onRecipePageLoad",
    OnBetweenRecipePageLoad = "onBetweenRecipePageLoad",
    LoadRecipesPage = "loadRecipesPage",
    ClearFilterForm = "clearFilterForm"
};

const RECIPES_PAGE_SIZE = 4;
const searchRequestManager = ApiRequestSendManager();

export const RecipeFilterContext = createContext<contextStateModel>({});

export const RecipeFilterDispatchContext = createContext<(action: ReducerActionProps) => any>((action: ReducerActionProps) => { });

export const RecipeFilterContextContextProvider = ({ children }: any) => {
    const [searchParams,] = useSearchParams();
    const [contextState, dispatch]: [contextStateModel, (action: ReducerActionProps) => any] = useReducer(recipeFilterReducer, {});

    useEffect(() => {
        getFilterFromParams();
    }, [searchParams])

    function recipeFilterReducer(contextState: contextStateModel, action: ReducerActionProps): contextStateModel {
        switch (action.type) {
            case RecipeFilterContextType.FilterSelect: {
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
            case RecipeFilterContextType.RefreshFiltersList: {
                getSavedFilters();
                return contextState;
            }
            case RecipeFilterContextType.SetSavedFiltersList: {
                return {
                    ...contextState,
                    savedFilters: action.value
                };
            }
            case RecipeFilterContextType.Filter: {
                getRecipesByFilter(contextState.recipesFilterForm || {}, 0, RECIPES_PAGE_SIZE, onGetRecipesByFilterResponse);
                updateFilterPageUrl(contextState.recipesFilterForm);
                return {
                    ...contextState,
                    recipesPages: [],
                    isLoaded: false
                };
            }
            case RecipeFilterContextType.FilterFormChange: {
                return {
                    ...contextState,
                    recipesFilterForm: {
                        ...contextState.recipesFilterForm,
                        [action.fieldName]: action.value
                    }
                }
            }
            case RecipeFilterContextType.OnRecipePageLoad: {
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
            case RecipeFilterContextType.OnBetweenRecipePageLoad: {
                const recipesPages = [...(contextState?.recipesPages || [])];
                recipesPages[action.recipesPage.number] = action.recipesPage.content;
                loadBetweenPage(contextState, recipesPages, action.recipesPage);
                focusOnRecipesPage(contextState.currentPage?.number);
                return {
                    ...contextState,
                    recipesPages: recipesPages
                };
            }
            case RecipeFilterContextType.LoadRecipesPage: {
                getRecipesByFilter(contextState.recipesFilterForm || {}, action.value, RECIPES_PAGE_SIZE, onGetRecipesByFilterResponse);
                return {
                    ...contextState
                };
            }
            case RecipeFilterContextType.ClearFilterForm: {
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

    function getSavedFilters() {
        savedRecipeFiltersApi.getRecipeFilters((response) => dispatch({ type: RecipeFilterContextType.SetSavedFiltersList, value: response.value }));
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
            type: RecipeFilterContextType.OnRecipePageLoad,
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
            type: RecipeFilterContextType.OnBetweenRecipePageLoad,
            recipesPage: response.value
        });
    }

    function focusOnRecipesPage(page?: number) {
        setTimeout(() => {
            scrollIntoRecipesPage(page || 0);
        }, 400)
    }

    function getFilterFromParams() {
        setTimeout(() => {
            const queryParams: any = new URLSearchParams(window.location.search);
            for (const [fieldName, value] of queryParams) {
                let parsedValue = value;
                try {
                    parsedValue = JSON.parse(value)
                } catch (e) { }

                dispatch({
                    type: RecipeFilterContextType.FilterFormChange,
                    fieldName,
                    value: parsedValue
                })
            }
            setTimeout(() => {
                dispatch({ type: RecipeFilterContextType.Filter })
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