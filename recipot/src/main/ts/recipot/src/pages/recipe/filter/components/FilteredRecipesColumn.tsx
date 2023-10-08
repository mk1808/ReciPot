import { useContext } from "react";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Recipe } from "../../../../data/types";
import { Stack } from "react-bootstrap";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { useTranslation } from "react-i18next";
import NoContent from "../../../../components/complex/NoContent";
import MySpinner from "../../../../components/basicUi/MySpinner";
import PageDivider from "../../../../components/basicUi/PageDivider";
import MorePagesButton from "../../../../components/basicUi/MorePagesButton";
import useMyNav from "../../../../hooks/useMyNav";

function FilteredRecipesColumn() {
    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const isLoaded = recipeFilterContext.isLoaded;
    const { t } = useTranslation();
    const nav = useMyNav();
    const recipeCallback = (recipe: Recipe, event: any) => nav.openInBackground({ id: recipe.id }, event);
    function loadNextPage() {
        recipeFilterDispatchContext({
            type: 'loadRecipesPage',
            value: (recipeFilterContext.currentPage?.number || 0) + 1
        })
    }

    return (
        <>
            {!isLoaded && <MySpinner />}
            {isLoaded && (recipeFilterContext.currentPage?.totalElements || 0 > 0 ? renderContent() : renderNoData())}
        </>
    )

    function renderContent() {
        return (
            <div className="px-2">
                {recipeFilterContext.recipesPages?.map(renderRecipesPage)}
                {renderLoadNextPageButton()}
            </div>
        );
    }

    function renderRecipesPage(recipes: Recipe[], index: number) {
        const pageId = "recipesPage_" + index;
        return (
            <div key={pageId} id={pageId}>
                <PageDivider text={`${t('p.page')} ${index + 1}`} />
                <Stack direction="horizontal" className="flex-wrap justify-content-center" gap={3}>
                    {recipes?.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onGoToRecipe={recipeCallback}/>)}
                </Stack>
            </div>
        );
    };

    function renderLoadNextPageButton() {
        const currentPage = recipeFilterContext.currentPage;
        if (recipeFilterContext.recipesPages?.length !== currentPage?.totalPages) {
            return <MorePagesButton text={t("p.loadNextRecipesPage")} loadNextPage={loadNextPage} />
        }
        return null;
    }

    function renderNoData() {
        return <NoContent text={t('p.noElementsInSearch')} />
    }
}

export default FilteredRecipesColumn;