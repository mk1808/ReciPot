import { PrivateNote, Response } from "../data/types";
import restClient from "./RestClient";

function PrivateNotesApi() {
    const PREFIX = '/privateNotes';

    const createPrivateNote = (body: PrivateNote, onSuccess: (response: Response<PrivateNote>) => any, onError?: (response: Response<PrivateNote>) => any) => {
        restClient.post(`${PREFIX}`, body, onSuccess, onError)
    }

    const deletePrivateNote = (privateNoteId: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${privateNoteId}`, onSuccess, onError)
    }

    const getPrivateNoteByRecipeId = (recipeId: string, onSuccess: (response: Response<PrivateNote>) => any, onError?: (response: Response<PrivateNote>) => any) => {
        restClient.get(`${PREFIX}/${recipeId}`, onSuccess, onError)
    }

    return { createPrivateNote, deletePrivateNote, getPrivateNoteByRecipeId }
}

const privateNotesApi = PrivateNotesApi();
export default privateNotesApi;