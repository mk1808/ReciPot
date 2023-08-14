import { AppUser, Response } from "../data/types";
import restClient from "./RestClient";

function UsersApi() {
    const PREFIX = '/users';

    const updateUser = (userId: string, body: AppUser, onSuccess: (response: Response<AppUser>) => any, onError: (response: Response<AppUser>) => any) => {
        restClient.put(`${PREFIX}/${userId}`, body, onSuccess, onError)
    }

    return { updateUser }
}

const usersApi = UsersApi();
export default usersApi;