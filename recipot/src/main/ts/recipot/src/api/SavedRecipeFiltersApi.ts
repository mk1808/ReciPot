import { RecipeFilter, Response } from "../data/types";
import restClient from "./RestClient";

function SavedRecipeFiltersApi() {
    const PREFIX = '/savedRecipeFilters';

    const createRecipeFilter = (body: RecipeFilter, onSuccess: (response: Response<RecipeFilter>) => any, onError?: (response: Response<RecipeFilter>) => any) => {
        restClient.post(`${PREFIX}`, body, onSuccess, onError)
    }

    const getRecipeFilters = (onSuccess: (response: Response<RecipeFilter[]>) => any, onError?: (response: Response<RecipeFilter[]>) => any) => {
        restClient.get(`${PREFIX}`, onSuccess, onError)
    }

    const deleteRecipeFilter = (recipeFilterId: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${recipeFilterId}`, onSuccess, onError)
    }

    return { createRecipeFilter, getRecipeFilters, deleteRecipeFilter }
}

const savedRecipeFiltersApi = SavedRecipeFiltersApi();
export default savedRecipeFiltersApi;