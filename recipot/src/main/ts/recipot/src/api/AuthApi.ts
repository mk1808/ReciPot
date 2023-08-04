import { ChangePasswordDto, UserLoginDto, UserRegisterDto } from "../data/types";
import restClient from "./RestClient";

function AuthApi() {
    const PREFIX = '/auth';

    const login = (body: UserLoginDto, onSuccess: () => any, onError: () => any) => {
        restClient.create('/login3', body, onSuccess, onError)
    }

    const register = (body: UserRegisterDto, onSuccess: () => any, onError: () => any) => {
        restClient.create(`${PREFIX}/register`, body, onSuccess, onError)
    }

    const changePassword = (body: ChangePasswordDto, onSuccess: () => any, onError: () => any) => {
        restClient.patch(`${PREFIX}/changePassword`, body, onSuccess, onError)
    }

    return { login, register, changePassword }
}

const authApi = AuthApi();
export default authApi;