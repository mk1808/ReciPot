import { useContext } from "react";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Recipe } from "../../../../data/types";
import { Stack } from "react-bootstrap";
import { RecipeFilterContext } from "../context/RecipeFilterContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


function FilteredRecipesColumn() {
    const recipeFilterContext = useContext(RecipeFilterContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const recipeCallback = (recipe: Recipe) => { navigate(`/recipes/${recipe.id}`) }


    return (
        <div>
            {recipeFilterContext.recipesPages?.map(renderRecipesPage)}
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
}

export default FilteredRecipesColumn;