
export function createPathParams(params: any) {
    var pathParams = "";
    for (const param in params) {
        if (pathParams.length > 0) {
            pathParams += '&';
        }
        pathParams += `${param}=${params[param]}`
    }
    return pathParams;
}

export function showErrorAlert(response:string, alertDispatchContest:any){
    alertDispatchContest({
        type: 'added',
        message: response,
        alertType: "danger"
    })
}