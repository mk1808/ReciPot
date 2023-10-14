import { useContext } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MorePagesButton from "../../../../components/basicUi/MorePagesButton";
import MySpinner from "../../../../components/basicUi/MySpinner";
import PageDivider from "../../../../components/basicUi/PageDivider";
import NoContent from "../../../../components/complex/NoContent";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Recipe } from "../../../../data/types";
import useMyNav from "../../../../hooks/useMyNav";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";

function FilteredRecipesColumn() {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    const nav = useMyNav();
    const isLoaded = recipeFilterContext.isLoaded;

    const onGoToRecipe = (recipe: Recipe, event: any) => nav.openInBackground({ id: recipe.id }, event);

    function onLoadNextPage() {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.LoadRecipesPage,
            value: (recipeFilterContext.currentPage?.number || 0) + 1
        })
    }

    function shouldDisplayNextPageButton() {
        return recipeFilterContext.recipesPages?.length !== recipeFilterContext.currentPage?.totalPages;
    }

    if (!isLoaded) {
        return <MySpinner />
    }

    if ((recipeFilterContext.currentPage?.totalElements || 0) > 0) {
        return renderContent();
    }

    return renderNoData();

    function renderContent() {
        return (
            <div className="px-2">
                {renderRecipesPages()}
                {renderLoadNextPageButton()}
            </div>
        );
    };

    function renderRecipesPages() {
        return recipeFilterContext.recipesPages?.map(renderRecipesPage);
    }

    function renderLoadNextPageButton() {
        return shouldDisplayNextPageButton() && <MorePagesButton text={t("p.loadNextRecipesPage")} onLoadNextPage={onLoadNextPage} />;
    };

    function renderRecipesPage(recipes: Recipe[], index: number) {
        const pageId = "recipesPage_" + index;
        const pageDividerText = `${t('p.page')} ${index + 1}`;
        return (
            <div key={pageId} id={pageId}>
                <PageDivider text={pageDividerText} />
                <Stack direction="horizontal" className="flex-wrap justify-content-center" gap={3}>
                    {renderPageRecipes(recipes)}
                </Stack>
            </div>
        );
    };

    function renderPageRecipes(recipes: Recipe[]) {
        return recipes?.map(recipe =>
            <RecipeCard key={recipe.id} recipe={recipe} onGoToRecipe={onGoToRecipe} />
        );
    }

    function renderNoData() {
        return <NoContent text={t('p.noElementsInSearch')} />
    };
}

export default FilteredRecipesColumn;