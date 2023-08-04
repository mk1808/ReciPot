function RestClient(): any {
    const URL = process.env.REACT_APP_URL;

    const apiCall = (path: string | undefined, onSuccess: () => any, onError: () => any, method: any) => {
        fetch(`${URL}${path}`, {
            method: method,
            headers: { 'Content-Type': 'application/json; character=utf-8' }
        })
            .then(response => response.json())
            .then(onSuccess)
            .catch(onError);
    }

    const apiCallWithBody = (path: string | undefined, body: object, onSuccess: () => any, onError: () => any, method: any) => {
        fetch(`${URL}${path}`, {
            method: method,
            headers: { 'Content-Type': 'application/json; character=utf-8' },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(onSuccess)
            .catch(onError);
    }

    const _get = (path: string | undefined, onSuccess: () => any, onError: () => any) => {
        apiCall(path, onSuccess, onError, 'GET')
    }

    const _delete = (path: string | undefined, onSuccess: () => any, onError: () => any) => {
        apiCall(path, onSuccess, onError, 'DELETE')
    }

    const _update = (path: string | undefined, body: object, onSuccess: () => any, onError: () => any) => {
        apiCallWithBody(path, body, onSuccess, onError, 'UPDATE')
    }

    const _create = (path: string | undefined, body: object, onSuccess: () => any, onError: () => any) => {
        apiCallWithBody(path, body, onSuccess, onError, 'CREATE')
    }

    return {get:_get, delete:_delete, update:_update, create:_create}

}

export default RestClient;