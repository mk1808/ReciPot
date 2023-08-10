import { Response } from "../data/types";

function RestClient() {
    const URL = "/api";
    const HEADER = { 'Content-Type': 'application/json; character=utf-8' };

    const apiCall = <T>(method: any, path: string | undefined, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        fetch(`${URL}${path}`, {
            method: method,
            headers: HEADER
        })
            .then(response => response.json())
            .then(onSuccess)
            .catch(onError);
    }

    const apiCallWithBody = <T>(method: any, path: string | undefined, body: object, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        fetch(`${URL}${path}`, {
            method: method,
            headers: HEADER,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(onSuccess)
            .catch(onError);
    }

    const _get = <T>(path: string | undefined, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        apiCall('GET', path, onSuccess, onError)
    }

    const _delete = <T>(path: string | undefined, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        apiCall('DELETE', path, onSuccess, onError)
    }

    const _put = <T>(path: string | undefined, body: object, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        apiCallWithBody('PUT', path, body, onSuccess, onError)
    }

    const _post = <T>(path: string | undefined, body: object, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        apiCallWithBody('POST', path, body, onSuccess, onError)
    }

    const _patch = <T>(path: string | undefined, body: object, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        apiCallWithBody('PATCH', path, body, onSuccess, onError)
    }

    return { get: _get, delete: _delete, put: _put, post: _post, patch: _patch }
}

const restClient = RestClient();

export default restClient;