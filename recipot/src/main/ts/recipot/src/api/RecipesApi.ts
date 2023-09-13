import { Recipe, RecipeSearchDto, Response, SharedRecipe } from "../data/types";
import { ResponsePage } from "../data/utilTypes";
import { createPathParams } from "../utils/RestUtils";
import restClient from "./RestClient";

function RecipesApi() {
    const PREFIX = '/recipes';

    const postRecipe = (body: Recipe, onSuccess: (response: Response<Recipe>) => any, onError?: (response: Response<Recipe>) => any) => {
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

    const share = (body: Recipe, onSuccess: (response: Response<SharedRecipe>) => any, onError?: (response: Response<SharedRecipe>) => any) => {
        restClient.post(`${PREFIX}/sharing`, body, onSuccess, onError)
    }

    const search = (body: RecipeSearchDto, params: { pageNum?: number, pageSize?: number }, onSuccess: (response: Response<ResponsePage<Recipe>>) => any, onError?: (response: Response<any>) => any) => {
        var pathParams = createPathParams(params);
        restClient.post(`${PREFIX}/search?${pathParams}`, body, onSuccess, onError)
    }

    return { postRecipe, getRecipe, putRecipe, changeVisibility, share, search }
}

const recipesApi = RecipesApi();
export default recipesApi;