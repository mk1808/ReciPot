import { useContext } from "react";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Recipe } from "../../../../data/types";
import { Stack } from "react-bootstrap";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MyButton from "../../../../components/basicUi/MyButton";


function FilteredRecipesColumn() {
    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const recipeCallback = (recipe: Recipe) => { navigate(`/recipes/${recipe.id}`) }

    function loadNextPage() {
        recipeFilterDispatchContext({
            type: 'loadRecipesPage',
            value: (recipeFilterContext.currentPage?.number || 0) + 1
        })
    }

    return (
        <div>
            {recipeFilterContext.recipesPages?.map(renderRecipesPage)}
            {renderLoadNextPageButton()}
        </div>
    );

    function renderRecipesPage(recipes: Recipe[], index: number) {
        const pageId = "recipesPage_" + index;
        return (
            <div key={pageId} id={pageId}>
                <h3>-------------- {t('p.page')} {index + 1} --------------</h3>
                <Stack direction="horizontal" className="flex-wrap justify-content-center" gap={3}>
                    {recipes?.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} recipeCallback={recipeCallback}></RecipeCard >)}
                </Stack>
            </div>
        );
    };

    function renderLoadNextPageButton() {
        const currentPage = recipeFilterContext.currentPage;
        if (recipeFilterContext.recipesPages?.length !== currentPage?.totalPages) {
            return (
                <MyButton.Primary onClick={loadNextPage}>
                    {t("p.loadNextRecipesPage")}
                </MyButton.Primary>
            )
        }
        return null;
    }
}

export default FilteredRecipesColumn;