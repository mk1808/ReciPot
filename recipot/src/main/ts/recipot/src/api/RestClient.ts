function RestClient(): any {
    const URL = "/api"

    const apiCall = (method: any, path: string | undefined, onSuccess: () => any, onError: () => any) => {
        fetch(`${URL}${path}`, {
            method: method,
            headers: { 'Content-Type': 'application/json; character=utf-8' }
        }) 
            .then(response => response.json())
            .then(onSuccess)
            .catch(onError);
    }

    const apiCallWithBody = (method: any, path: string | undefined, body: object, onSuccess: () => any, onError: () => any) => {
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
        apiCall('GET', path, onSuccess, onError)
    }

    const _delete = (path: string | undefined, onSuccess: () => any, onError: () => any) => {
        apiCall('DELETE', path, onSuccess, onError)
    }

    const _update = (path: string | undefined, body: object, onSuccess: () => any, onError: () => any) => {
        apiCallWithBody('UPDATE', path, body, onSuccess, onError)
    }

    const _create = (path: string | undefined, body: object, onSuccess: () => any, onError: () => any) => {
        apiCallWithBody('POST', path, body, onSuccess, onError)
    }

    return {get:_get, delete:_delete, update:_update, create:_create}

}

const restClient = RestClient();

export default restClient;