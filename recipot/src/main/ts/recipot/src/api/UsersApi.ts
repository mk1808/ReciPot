import restClient from "./RestClient";
import { AppUser, ChangePasswordDto, Response } from "../data/types";

function UsersApi() {
    const PREFIX = '/users';

    const updateUser = (userId: string, body: AppUser, onSuccess: (response: Response<AppUser>) => any, onError: (response: Response<AppUser>) => any) => {
        restClient.put(`${PREFIX}/${userId}`, body, onSuccess, onError)
    }
    
    const changePassword = (body: ChangePasswordDto, onSuccess: (response: Response<any>) => any, onError: (response: Response<any>) => any) => {
        restClient.patch(`${PREFIX}/changePassword`, body, onSuccess, onError)
    }

    return { updateUser, changePassword }
}

const usersApi = UsersApi();
export default usersApi;