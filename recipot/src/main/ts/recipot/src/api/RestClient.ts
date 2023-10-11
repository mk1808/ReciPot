import { Response } from "../data/types";

function RestClient() {
    const URL = "/api";
    const HEADER = { 'Content-Type': 'application/json; character=utf-8' };

    const defaultOnError = (response: any) => { console.warn("error ", response) }

    const apiCall = <T>(method: any, path: string | undefined, onSuccess: (response: Response<T>) => any, onError: (response: Response<T>) => any = defaultOnError) => {
        fetch(`${URL}${path}`, {
            method: method,
            headers: HEADER
        })
            .then((response: any) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(onSuccess)
            .catch((response) => response.json().then(onError).catch(onError));
    }

    const apiCallWithBody = <T>(method: any, path: string | undefined, body: object, onSuccess: (response: Response<T>) => any, onError: (response: Response<T>) => any = defaultOnError) => {
        fetch(`${URL}${path}`, {
            method: method,
            headers: HEADER,
            body: JSON.stringify(body)
        })
            .then((response: any) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(onSuccess)
            .catch((response) => response.json().then(onError).catch(onError));
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

    const _postFile = <T>(path: string, file: any, onSuccess: (response: Response<T>) => any, onError?: (response: Response<T>) => any) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${URL}${path}`, {
            method: 'POST',
            body: formData
        })
            .then((response: any) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(onSuccess)
            .catch((response) => response.json().then(onError).catch(onError));
    }

    return { get: _get, delete: _delete, put: _put, post: _post, patch: _patch, postFile: _postFile }
}

const restClient = RestClient();

export default restClient;