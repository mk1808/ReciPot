import { Category, CategoryDto, HashTag, Ingredient, RecipeAccessType, RecipeAmountOfDishes, RecipeDifficulty, RecipeRequiredEffort, Response } from "../data/types";
import { createPathParams } from "../utils/RestUtils";
import restClient from "./RestClient";

function DictionariesApi() {
    const PREFIX = '/dictionaries';
    const defaultOnError = (response: any) => { console.warn("error", response) }

    const createCategory = (body: Category, onSuccess: (response: Response<Category>) => any, onError?: (response: Response<Category>) => any) => {
        restClient.post(`${PREFIX}/categories`, body, onSuccess, onError)
    }

    const getAllCategories = (onSuccess: (response: Response<CategoryDto[]>) => any, onError: ((response: Response<CategoryDto[]>) => any) = defaultOnError) => {
        restClient.get(`${PREFIX}/categories`, onSuccess, onError)
    }

    const createHashTag = (body: HashTag, onSuccess: (response: Response<HashTag>) => any, onError?: (response: Response<HashTag>) => any) => {
        restClient.post(`${PREFIX}/hashTags`, body, onSuccess, onError)
    }

    const getHashTags = (params: { name?: string, page?: number, size?: number }, onSuccess: (response: Response<HashTag[]>) => any, onError?: (response: Response<HashTag[]>) => any) => {
        var pathParams = createPathParams(params);
        restClient.get(`${PREFIX}/hashTags?${pathParams}`, onSuccess, onError)
    }

    const getAllRequiredEfforts = (onSuccess: (response: Response<RecipeRequiredEffort[]>) => any, onError?: (response: Response<RecipeRequiredEffort[]>) => any) => {
        restClient.get(`${PREFIX}/requiredEfforts`, onSuccess, onError)
    }

    const getAllDifficulties = (onSuccess: (response: Response<RecipeDifficulty[]>) => any, onError?: (response: Response<RecipeDifficulty[]>) => any) => {
        restClient.get(`${PREFIX}/difficulties`, onSuccess, onError)
    }

    const getAllAmountsOfDishes = (onSuccess: (response: Response<RecipeAmountOfDishes[]>) => any, onError?: (response: Response<RecipeAmountOfDishes[]>) => any) => {
        restClient.get(`${PREFIX}/amountOfDishes`, onSuccess, onError)
    }

    const getAllAccessTypes = (onSuccess: (response: Response<RecipeAccessType[]>) => any, onError?: (response: Response<RecipeAccessType[]>) => any) => {
        restClient.get(`${PREFIX}/accessTypes`, onSuccess, onError)
    }

    const createIngredient = (body: Category, onSuccess: (response: Response<Ingredient>) => any, onError?: (response: Response<Ingredient>) => any) => {
        restClient.post(`${PREFIX}/ingredients`, body, onSuccess, onError)
    }

    const getAllIngredients = (params: { name?: string, page?: number, size?: number }, onSuccess: (response: Response<Ingredient[]>) => any, onError?: (response: Response<Ingredient[]>) => any) => {
        var pathParams = createPathParams(params);
        restClient.get(`${PREFIX}/ingredients?${pathParams}`, onSuccess, onError)
    }

    return { createCategory, getAllCategories, createHashTag, getHashTags, getAllRequiredEfforts, getAllDifficulties, getAllAmountsOfDishes, getAllAccessTypes, createIngredient, getAllIngredients }
}

const dictionariesApi = DictionariesApi();
export default dictionariesApi;