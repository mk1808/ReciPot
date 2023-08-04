import restClient from "./RestClient";

function RecipesApi() {
    const getRecipe=(id:string, onSuccess: () => any, onError?: () => any)=>{
        restClient.get(`/recipes/${id}`, onSuccess, onError)
    }

    const postRecipe=(body:object, onSuccess: () => any, onError: () => any)=>{
        restClient.create('', body, onSuccess, onError)
    }

    return {getRecipe, postRecipe}
}

const recipesApi = RecipesApi();
export default recipesApi;