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

export const onImageLoadError = ({ currentTarget }: any) => {
    currentTarget.onerror = null;
    currentTarget.src = DEFAULT_IMAGE;
}