import restClient from "./RestClient";

function AuthApi() {


    const login=(body:object, onSuccess: () => any, onError: () => any)=>{
        restClient.create('/login3', body, onSuccess, onError)
    }

    return {login}
}

const authApi = AuthApi();
export default authApi;