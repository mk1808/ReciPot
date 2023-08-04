import { Recipe } from "../data/types";
import restClient from "./RestClient";

function RecipesApi() {
    const PREFIX = '/recipes';

    const postRecipe = (body: Recipe, onSuccess: () => any, onError: () => any) => {
        restClient.create(`${PREFIX}`, body, onSuccess, onError)
    }

    const getRecipe = (id: string, onSuccess: () => any, onError?: () => any) => {
        restClient.get(`${PREFIX}/${id}`, onSuccess, onError)
    }

    const putRecipe = (id: string, body: Recipe, onSuccess: () => any, onError: () => any) => {
        restClient.update(`${PREFIX}/${id}`, body, onSuccess, onError)
    }

    const changeVisibility = (id: string, onSuccess: () => any, onError: () => any) => {
        restClient.patch(`${PREFIX}/visibility/${id}`, onSuccess, onError)
    }

    const share = (body: Recipe, onSuccess: () => any, onError: () => any) => {
        restClient.create(`${PREFIX}/sharing`, body, onSuccess, onError)
    }

    return { postRecipe, getRecipe, putRecipe, changeVisibility, share }
}

const recipesApi = RecipesApi();
export default recipesApi;