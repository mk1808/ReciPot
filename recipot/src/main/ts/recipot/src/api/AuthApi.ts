import { AppUser, ChangePasswordDto, Response, UserLoginDto, UserRegisterDto } from "../data/types";
import restClient from "./RestClient";

function AuthApi() {
    const PREFIX = '/auth';

    const login = (body: UserLoginDto, onSuccess: (response: Response<any>) => any, onError: (response: Response<any>) => any) => {
        restClient.post('/login3', body, onSuccess, onError)
    }

    const register = (body: UserRegisterDto, onSuccess: (response: Response<AppUser>) => any, onError: (response: Response<AppUser>) => any) => {
        restClient.post(`${PREFIX}/register`, body, onSuccess, onError)
    }

    const changePassword = (body: ChangePasswordDto, onSuccess: (response: Response<any>) => any, onError: (response: Response<any>) => any) => {
        restClient.patch(`${PREFIX}/changePassword`, body, onSuccess, onError)
    }

    return { login, register, changePassword }
}

const authApi = AuthApi();
export default authApi;