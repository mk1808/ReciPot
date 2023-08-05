import { Recipe, Response, SharedRecipe } from "../data/types";
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

    return { postRecipe, getRecipe, putRecipe, changeVisibility, share }
}

const recipesApi = RecipesApi();
export default recipesApi;