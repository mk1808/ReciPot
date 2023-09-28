import { RecipeCollection, RecipeCollectionItem, Response } from "../data/types";
import { ResponsePage } from "../data/utilTypes";
import { createPathParams } from "../utils/RestUtils";
import restClient from "./RestClient";

function RecipeCollectionsApi() {
    const PREFIX = '/recipeCollections';

    const createCollection = (body: RecipeCollection, onSuccess: (response: Response<RecipeCollection>) => any, onError?: (response: Response<RecipeCollection>) => any) => {
        restClient.post(`${PREFIX}`, body, onSuccess, onError)
    }

    const addCollectionItem = (collectionId: string, body: RecipeCollectionItem, onSuccess: (response: Response<RecipeCollectionItem>) => any, onError?: (response: Response<RecipeCollectionItem>) => any) => {
        restClient.post(`${PREFIX}/${collectionId}/recipe`, body, onSuccess, onError)
    }

    const getCollection = (collectionId: string, onSuccess: (response: Response<RecipeCollection>) => any, onError?: (response: Response<RecipeCollection>) => any) => {
        restClient.get(`${PREFIX}/${collectionId}`, onSuccess, onError)
    }

    const getUserRecipeCollections = (onSuccess: (response: Response<RecipeCollection[]>) => any, onError?: (response: Response<RecipeCollection[]>) => any) => {
        restClient.get(`${PREFIX}`, onSuccess, onError)
    }

    const getRecipeCollectionRecipes = (collectionId: string, params: { pageNum?: number, pageSize?: number }, onSuccess: (response: Response<ResponsePage<RecipeCollectionItem>>) => any, onError?: (response: Response<any>) => any) => {
        var pathParams = createPathParams(params);
        restClient.get(`${PREFIX}/${collectionId}/recipes?${pathParams}`, onSuccess, onError)
    }

    const deleteRecipeFromCollection = (collectionId: string, recipeId: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${collectionId}/recipe/${recipeId}`, onSuccess, onError)
    }

    const deleteCollection = (collectionId: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${collectionId}`, onSuccess, onError)
    }

    const getUserCollectionByName = (name: string, onSuccess: any, onError?: (response: Response<any>) => any) => {
        restClient.get(`${PREFIX}/byName/${name}`, onSuccess, onError)
    }

    return { createCollection, addCollectionItem, getCollection, getUserRecipeCollections, deleteRecipeFromCollection, deleteCollection, getRecipeCollectionRecipes, getUserCollectionByName }
}

const recipeCollectionsApi = RecipeCollectionsApi();
export default recipeCollectionsApi;