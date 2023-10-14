import { createContext, useContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

import recipesApi from "../../../../api/RecipesApi";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import { UsersContext } from "../../../../context/UserContext";
import { Recipe, RecipeFilter, Response } from "../../../../data/types";
import { ResponsePage } from "../../../../data/utilTypes";
import useRequestSendManager from "../../../../hooks/useRequestSendManager";
import { buildRecipeSearchDto, focusOnRecipesPage, getRecipePages, getSelectedFilterFormValue, parseParamsToFilterValues, updatePageUrl } from "../utils/RecipeSearchUtils";

export type contextStateModel = {
    savedFilters?: RecipeFilter[],
    recipesPages?: Recipe[][],
    activeRecipeFilterId?: string,
    currentPage?: { totalPages: number, number: number, totalElements: number },
    recipesFilterForm?: any,
    isLoaded?: boolean
};

export type ReducerActionProps = {
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

export const RecipeFilterContext = createContext<contextStateModel>({});

export const RecipeFilterDispatchContext = createContext<(action: ReducerActionProps) => any>((action: ReducerActionProps) => { });

export const RecipeFilterContextContextProvider = ({ children }: any) => {
    const [searchParams,] = useSearchParams();
    const [nextAndLock, unlock] = useRequestSendManager();
    const [contextState, dispatch]: [contextStateModel, (action: ReducerActionProps) => any] = useReducer(recipeFilterReducer, {});

    const user = useContext(UsersContext);

    useEffect(() => {
        if (!!user) {
            dispatch({ type: RecipeFilterContextType.RefreshFiltersList });
        }
    }, [user])

    useEffect(() => {
        getFilterFromParams();
    }, [searchParams])

    function recipeFilterReducer(contextState: contextStateModel, action: ReducerActionProps): contextStateModel {
        switch (action.type) {
            case RecipeFilterContextType.FilterSelect: {
                const newRecipesFilterForm = getSelectedFilterFormValue(contextState, action.activeRecipeFilterId)
                onFilterSelect(newRecipesFilterForm);
                return {
                    ...contextState,
                    activeRecipeFilterId: action.activeRecipeFilterId,
                    recipesPages: [],
                    recipesFilterForm: newRecipesFilterForm,
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
                onFilterSelect(contextState.recipesFilterForm);
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
                const recipesPages = getRecipePages(contextState, action);
                loadBetweenPage(contextState, recipesPages, action.recipesPage);
                return {
                    ...contextState,
                    recipesPages: recipesPages,
                    currentPage: action.recipesPage,
                    isLoaded: true
                };
            }
            case RecipeFilterContextType.OnBetweenRecipePageLoad: {
                const recipesPages = getRecipePages(contextState, action);
                loadBetweenPage(contextState, recipesPages, action.recipesPage);
                focusOnRecipesPage(contextState.currentPage?.number);
                return {
                    ...contextState,
                    recipesPages: recipesPages
                };
            }
            case RecipeFilterContextType.LoadRecipesPage: {
                getRecipesPage(contextState.recipesFilterForm, action.value);
                return contextState;
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

    function onFilterSelect(newRecipesFilterFormState: any) {
        getRecipesPage(newRecipesFilterFormState, 0);
        updatePageUrl(newRecipesFilterFormState);
    }

    function getRecipesPage(recipesFilterForm: any, page: number) {
        getRecipesByFilter(recipesFilterForm || {}, page, RECIPES_PAGE_SIZE, onGetRecipesByFilterResponse);
    }

    function getSavedFilters() {
        savedRecipeFiltersApi.getRecipeFilters((response) =>
            dispatch({
                type: RecipeFilterContextType.SetSavedFiltersList,
                value: response.value
            })
        );
    }

    function getRecipesByFilter(recipesFilterForm: any, pageNum: number, pageSize: number, responseCallback: any) {
        nextAndLock(() => {
            recipesApi.search(buildRecipeSearchDto(recipesFilterForm), { pageNum, pageSize }, responseCallback, unlock);
        })
    }

    function onGetRecipesByFilterResponse(response: Response<ResponsePage<Recipe>>) {
        unlock();
        dispatch({
            type: RecipeFilterContextType.OnRecipePageLoad,
            recipesPage: response.value
        });
    }

    function loadBetweenPage(contextState: contextStateModel, nextPages: Recipe[][], nextPage: any) {
        const page = nextPage.number - 1
        if (page > 0 && typeof nextPages[page] === 'undefined') {
            getRecipesByFilter(contextState.recipesFilterForm || {}, page, RECIPES_PAGE_SIZE, onGetBetweenRecipesByFilterResponse);
        }
    }

    function onGetBetweenRecipesByFilterResponse(response: Response<ResponsePage<Recipe>>) {
        unlock();
        dispatch({
            type: RecipeFilterContextType.OnBetweenRecipePageLoad,
            recipesPage: response.value
        });
    }

    function getFilterFromParams() {
        setTimeout(() => {
            parseParamsToFilterValues().forEach(param => {
                dispatch({
                    type: RecipeFilterContextType.FilterFormChange,
                    ...param
                });
            });

            setTimeout(() => {
                dispatch({
                    type: RecipeFilterContextType.Filter
                });
            }, 100);
        }, 100);
    }

    return (
        <RecipeFilterContext.Provider value={contextState}>
            <RecipeFilterDispatchContext.Provider value={dispatch}>
                {children}
            </RecipeFilterDispatchContext.Provider>
        </RecipeFilterContext.Provider>
    )
}