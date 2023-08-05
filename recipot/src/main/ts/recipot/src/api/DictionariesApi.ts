import { Category, HashTag, Ingredient, RecipeDifficulty, RecipeRequiredEffort, Response } from "../data/types";
import { createPathParams } from "../utils/RestUtils";
import restClient from "./RestClient";

function DictionariesApi() {
    const PREFIX = '/dictionaries';

    const createCategory = (body: Category, onSuccess: (response: Response<Category>) => any, onError?: (response: Response<Category>) => any) => {
        restClient.post(`${PREFIX}/categories`, body, onSuccess, onError)
    }

    const getAllCategories = (onSuccess: (response: Response<Category[]>) => any, onError?: (response: Response<Category[]>) => any) => {
        restClient.get(`${PREFIX}/categories`, onSuccess, onError)
    }

    const createHashTag = (body: HashTag, onSuccess: (response: Response<HashTag>) => any, onError?: (response: Response<HashTag>) => any) => {
        restClient.post(`${PREFIX}/hashTags`, body, onSuccess, onError)
    }

    function getHashTags(params: { name?: string, page?: number, size?: number }, onSuccess: (response: Response<HashTag[]>) => any, onError?: (response: Response<HashTag[]>) => any) {
        var pathParams = createPathParams(params);
        restClient.get(`${PREFIX}/hashTags?${pathParams}`, onSuccess, onError)
    }

    const getAllRequiredEfforts = (onSuccess: (response: Response<RecipeRequiredEffort[]>) => any, onError?: (response: Response<RecipeRequiredEffort[]>) => any) => {
        restClient.get(`${PREFIX}/requiredEfforts`, onSuccess, onError)
    }

    const getAllDifficulties = (onSuccess: (response: Response<RecipeDifficulty[]>) => any, onError?: (response: Response<RecipeDifficulty[]>) => any) => {
        restClient.get(`${PREFIX}/difficulties`, onSuccess, onError)
    }

    const createIngredient = (body: Category, onSuccess: (response: Response<Ingredient>) => any, onError?: (response: Response<Ingredient>) => any) => {
        restClient.post(`${PREFIX}/ingredients`, body, onSuccess, onError)
    }

    const getAllIngredients = (params: { name?: string, page?: number, size?: number }, onSuccess: (response: Response<Ingredient[]>) => any, onError?: (response: Response<Ingredient[]>) => any) => {
        var pathParams = createPathParams(params);
        restClient.get(`${PREFIX}/ingredients?${pathParams}`, onSuccess, onError)
    }

    return { createCategory, getAllCategories, createHashTag, getHashTags, getAllRequiredEfforts, getAllDifficulties, createIngredient, getAllIngredients }
}

const dictionariesApi = DictionariesApi();
export default dictionariesApi;