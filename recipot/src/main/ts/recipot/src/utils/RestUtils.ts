import { Response } from "../data/types";

const DEFAULT_IMAGE = 'https://violashop.in/wp-content/uploads/2021/07/Viola-Candescent-Cutlery-Set-3.jpg';

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

export function showErrorAlert(response: string, alertDispatchContest: any) {
    alertDispatchContest({
        type: 'added',
        message: response,
        alertType: "danger"
    })
}

export function showSuccessAlert(response: string, alertDispatchContest: any) {
    alertDispatchContest({
        type: 'added',
        message: response,
        alertType: "success"
    })
}

export function onShowAlertOnErrorResponse(response: Response<any>, alertDispatchContest: any, t: any) {
    try {
        const errorDetails = JSON.parse(response.details);
        errorDetails.forEach((errorMessage: string) => showErrorAlert(t(errorMessage), alertDispatchContest));
    } catch (e) {
        showErrorAlert(t(response.message), alertDispatchContest);
    }
}

export const onImageLoadError = ({ currentTarget }: any) => {
    currentTarget.onerror = null;
    currentTarget.src = DEFAULT_IMAGE;
}