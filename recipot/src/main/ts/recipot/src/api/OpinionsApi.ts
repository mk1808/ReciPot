import { OpinionDto, Rating, Response } from "../data/types";
import restClient from "./RestClient";

function OpinionsApi() {
    const PREFIX = '/opinions';

    const createRating = (body: Rating, onSuccess: (response: Response<Rating>) => any, onError?: (response: Response<Rating>) => any) => {
        restClient.post(`${PREFIX}/ratings`, body, onSuccess, onError)
    }

    const createComment = (body: Comment, onSuccess: (response: Response<Comment>) => any, onError?: (response: Response<Comment>) => any) => {
        restClient.post(`${PREFIX}`, body, onSuccess, onError)
    }

    const getRecipeOpinions = (recipeId: string, onSuccess: (response: Response<OpinionDto[]>) => any, onError?: (response: Response<OpinionDto[]>) => any) => {
        restClient.get(`${PREFIX}/${recipeId}`, onSuccess, onError)
    }

    return { createRating, createComment, getRecipeOpinions }
}

const opinionsApi = OpinionsApi();
export default opinionsApi;