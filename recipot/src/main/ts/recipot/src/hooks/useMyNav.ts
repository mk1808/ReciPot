import { useNavigate } from "react-router-dom";
import { createUrl } from "./../utils/RecipeSearchUtils";
import { Category, CategoryDto } from "../data/types";
import { NavOpen } from "../data/utilTypes";

function useMyNav() {
    const navigate = useNavigate();
    const toMain = () => navigate('');
    const toLogin = () => navigate('/login');
    const toRecipe = (id: string) => navigate('/recipes/' + id);
    const toRecipeEdit = (id: string) => navigate('/recipes/edit/' + id);
    const toFilters = (search: string) => navigate('/recipes/filter' + search);
    const toUser = () => navigate('/user');
    const toBack = () => navigate(-1);

    const openInBackground = ({ url, id }: NavOpen, event: any) => {
        const finalUrl = url ?? '/recipes/' + id;
        if (event.ctrlKey) {
            window.open(finalUrl, "_blank")
            window.focus();
        } else {
            navigate(finalUrl)
        }
    }

    const goToFilters = (filters: any) => {
        let { search } = createUrl({ ...filters, accessType: 'PUBLIC' });
        toFilters(search);
    }

    const goToCategoryFilters = (category: Category | CategoryDto) => {
        goToFilters({ categories: [{ value: { id: category.id }, label: category.name }] });
    }

    return {
        toMain,
        toLogin,
        toRecipe,
        toRecipeEdit,
        toUser,
        goToFilters,
        goToCategoryFilters,
        openInBackground,
        toBack
    };
}

export default useMyNav;