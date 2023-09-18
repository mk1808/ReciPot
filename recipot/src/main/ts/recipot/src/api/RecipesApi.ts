import { PredefinedRecipeFilter, Recipe, RecipeSearchDto, Response, SharedRecipe } from "../data/types";
import { ResponsePage } from "../data/utilTypes";
import { createPathParams } from "../utils/RestUtils";
import restClient from "./RestClient";

function RecipesApi() {
    const PREFIX = '/recipes';

    const postRecipe = (body: Recipe, onSuccess: any, onError?: any) => {
        restClient.post(`${PREFIX}`, body, onSuccess, onError)
    }

    const getRecipe = (id: string, onSuccess: (response: Response<Recipe>) => any, onError?: (response: Response<Recipe>) => any) => {
        restClient.get(`${PREFIX}/${id}`, onSuccess, onError)
    }

    const putRecipe = (id: string, body: Recipe, onSuccess: (response: Response<Recipe>) => any, onError?: (response: Response<Recipe>) => any) => {
        restClient.put(`${PREFIX}/${id}`, body, onSuccess, onError)
    }

    const changeVisibility = (id: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.patch(`${PREFIX}/visibility/${id}`, {}, onSuccess, onError)
    }

    const share = (body: SharedRecipe, onSuccess: (response: Response<SharedRecipe>) => any, onError?: (response: Response<SharedRecipe>) => any) => {
        restClient.post(`${PREFIX}/sharing`, body, onSuccess, onError)
    }

    const search = (body: RecipeSearchDto, params: { pageNum?: number, pageSize?: number }, onSuccess: (response: Response<ResponsePage<Recipe>>) => any, onError?: (response: Response<any>) => any) => {
        let pathParams = createPathParams(params);
        restClient.post(`${PREFIX}/search?${pathParams}`, body, onSuccess, onError)
    }

    const getPredefinedFilter = (params: { pageNum?: number, pageSize?: number, type: PredefinedRecipeFilter }, onSuccess: (response: Response<ResponsePage<Recipe>>) => any, onError?: (response: Response<any>) => any) => {
        let pathParams = createPathParams(params);
        restClient.get(`${PREFIX}/predefinedFilter?${pathParams}`, onSuccess, onError)
    }

    const deleteRecipe = (id: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${id}`, onSuccess, onError)
    }

    return { postRecipe, getRecipe, putRecipe, changeVisibility, share, search, getPredefinedFilter, deleteRecipe }
}

const recipesApi = RecipesApi();
export default recipesApi;