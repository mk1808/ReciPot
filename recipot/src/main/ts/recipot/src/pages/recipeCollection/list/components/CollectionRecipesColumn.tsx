import { useContext } from "react";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Stack } from "react-bootstrap";
import { RecipeCollectionListContext } from "../context/RecipeCollectionListContext";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../data/types";
import { useNavigate } from "react-router-dom";
import { openInBackground } from "../../../../utils/NavigationUtils";
import MyHeader from "../../../../components/basicUi/MyHeader";


function CollectionRecipesColumn() {
    const collectionsContext = useContext(RecipeCollectionListContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const recipeCallback = (recipe: Recipe, event: any,) => openInBackground(`/recipes/${recipe.id}`, event, navigate);

    return (
        <div>
            {renderHeader()}
            {collectionsContext.recipesInCollection?.map(renderRecipesPage)}
        </div>
    );

    function renderHeader() {
        const activeRecipeCollectionName = collectionsContext.collections?.filter(collection => collection.id === collectionsContext.activeCollectionId)[0]?.name;
        return (
            <>
                <MyHeader title={t('p.recipeCollectionListHeader') + ": " + activeRecipeCollectionName}></MyHeader>
            </>
        );
    }

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

export default CollectionRecipesColumn;