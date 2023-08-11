import { RecipeCollection, RecipeCollectionItem, Response } from "../data/types";
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

    const deleteRecipeFromCollection = (collectionId: string, recipeId: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${collectionId}/recipe/${recipeId}`, onSuccess, onError)
    }

    const deleteCollection = (collectionId: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${collectionId}`, onSuccess, onError)
    }

    return { createCollection, addCollectionItem, getCollection, getUserRecipeCollections, deleteRecipeFromCollection, deleteCollection }
}

const recipeCollectionsApi = RecipeCollectionsApi();
export default recipeCollectionsApi;