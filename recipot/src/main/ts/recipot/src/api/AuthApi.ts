import restClient from "./RestClient";
import { AppUser, Response, UserLoginDto, UserRegisterDto } from "../data/types";

function AuthApi() {
    const PREFIX = '/auth';

    const login = (body: UserLoginDto, onSuccess: (response: Response<any>) => any, onError: (response: Response<any>) => any) => {
        restClient.post(`${PREFIX}/login`, body, onSuccess, onError)
    }

    const register = (body: UserRegisterDto, onSuccess: (response: Response<any>) => any, onError: (response: Response<any>) => any) => {
        restClient.post(`${PREFIX}/register`, body, onSuccess, onError)
    }

    const whoAmI = (onSuccess: (response: Response<AppUser>) => any, onError: (response: Response<any>) => any) => {
        restClient.get(`${PREFIX}/whoAmI`, onSuccess, onError)
    }

    const logout = (onSuccess: (response: Response<any>) => any, onError: (response: Response<any>) => any) => {
        restClient.get(`${PREFIX}/logout`, onSuccess, onError)
    }

    return { login, register, whoAmI, logout }
}

const authApi = AuthApi();
export default authApi;