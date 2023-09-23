import { createUrl } from "./RecipeSearchUtils";

export const openInBackground = (url: string, event: any, navigate: any) => {
    if (event.ctrlKey) {
        window.open(url, "_blank")
        window.focus();
    } else {
        navigate(url)
    }
}

export const goToFilters = (filters: any, navigate: any) => {
    let url = createUrl({ ...filters, accessType: 'PUBLIC' });
    navigate(`/recipes/filter${url?.search}`);
}