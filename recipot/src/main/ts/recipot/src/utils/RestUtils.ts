import defaultRecipeImage from '../assets/images/default_recipe_image.png';

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
    currentTarget.src = defaultRecipeImage;
}