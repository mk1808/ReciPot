import restClient from "./RestClient";
import { AppUser, Response } from "../data/types";

function UsersApi() {
    const PREFIX = '/users';

    const updateUser = (userId: string, body: AppUser, onSuccess: (response: Response<AppUser>) => any, onError: (response: Response<AppUser>) => any) => {
        restClient.put(`${PREFIX}/${userId}`, body, onSuccess, onError)
    }

    return { updateUser }
}

const usersApi = UsersApi();
export default usersApi;