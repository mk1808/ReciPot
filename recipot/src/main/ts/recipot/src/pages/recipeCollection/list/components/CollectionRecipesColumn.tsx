import { useContext, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaFolderMinus } from "react-icons/fa6";

import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import MorePagesButton from "../../../../components/basicUi/MorePagesButton";
import MyButton from "../../../../components/basicUi/MyButton";
import MyHeader from "../../../../components/basicUi/MyHeader";
import MySpinner from "../../../../components/basicUi/MySpinner";
import PageDivider from "../../../../components/basicUi/PageDivider";
import Tooltip from "../../../../components/basicUi/Tooltip";
import NoContent from "../../../../components/complex/NoContent";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Recipe, RecipeCollection } from "../../../../data/types";
import useAlerts from "../../../../hooks/useAlerts";
import useMyNav from "../../../../hooks/useMyNav";
import { initAs } from "../../../../utils/ObjectUtils";
import { getCollectionName } from "../../../../utils/TextUtils";
import { RecipeCollectionListContext, RecipeCollectionListContextType, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import DeleteFromCollectionDialog from "../dialogs/DeleteFromCollectionDialog";

function CollectionRecipesColumn() {
    const { t } = useTranslation();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [nextPageIndex, setNextPageIndex] = useState(0);
    const [recipeToDelete, setRecipeToDelete] = useState<Recipe | any>();

    const collectionsContext = useContext(RecipeCollectionListContext);
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const alerts = useAlerts();
    const nav = useMyNav();

    const isLoaded = collectionsContext.isLoaded;
    const activeRecipeCollection: RecipeCollection | undefined = getActiveRecipeCollection();
    const onGoToRecipe = (recipe: Recipe, event: any,) => nav.openInBackground({ id: recipe.id }, event);

    function deleteRecipeShowModal(recipe: Recipe, index: number) {
        setShowModalDelete(true);
        setRecipeToDelete(recipe);
        setNextPageIndex(index);
    }

    function deleteRecipeFromCollection() {
        recipeCollectionsApi.deleteRecipeFromCollection(activeRecipeCollection?.id || "", recipeToDelete.id, () => onDeleteSuccess(nextPageIndex))
    }

    function getActiveRecipeCollection() {
        return collectionsContext.collections?.filter(collection => collection.id === collectionsContext.activeCollectionId)[0];
    }

    function onDeleteSuccess(index: number) {
        alerts.showSuccessAlert(t('p.recipeRemovedFromCollection'));
        loadNextPage(index)
    }

    function loadNextPage(index: number) {
        collectionsDispatchContext({
            type: RecipeCollectionListContextType.LoadRecipesPage,
            value: index
        })
    }

    function getColumnTitle() {
        return `${t('p.recipeCollectionListHeader')}: ${t(getCollectionName(activeRecipeCollection, t))}`;
    }

    return (
        <div>
            {renderHeader()}
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );

    function renderContent() {
        if (!isLoaded) {
            return <MySpinner />
        }
        if ((collectionsContext.currentPage?.totalElements || 0) > 0) {
            return renderRecipesPages();
        }
        return renderNoData();
    }

    function renderRecipesPages() {
        return (
            <>
                {collectionsContext.recipesInCollection?.map(renderRecipesPage)}
                {renderLoadNextPageButton()}
            </>
        );
    }

    function renderHeader() {
        return (
            <MyHeader title={getColumnTitle()} />
        );
    }

    function renderRecipesPage(recipes: Recipe[], index: number) {
        const pageId = "recipesPage_" + index;
        return (
            <div key={pageId} id={pageId}>
                <PageDivider text={`${t('p.page')} ${index + 1}`} />
                <Stack direction="horizontal" className="flex-wrap justify-content-center" gap={3}>
                    {recipes?.map(recipe => renderRecipeCard(recipe, index))}
                </Stack>
            </div>
        );
    };

    function renderRecipeCard(recipe: Recipe, index: number) {
        return (
            <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onGoToRecipe={onGoToRecipe}
                additionalFunctionElement={renderDeleteFromCollection(recipe, index)}
            />
        );
    }

    function renderDeleteFromCollection(recipe: Recipe, index: number) {
        return activeRecipeCollection?.canDelete && (
            <>
                <Tooltip title={t('p.removeFromCollection')}>
                    <MyButton.Primary onClick={() => { deleteRecipeShowModal(recipe, index) }} className="round">
                        <FaFolderMinus />
                    </MyButton.Primary>
                </Tooltip>
                {renderModal()}
            </>
        )
    }

    function renderLoadNextPageButton() {
        if (collectionsContext.recipesInCollection?.length !== collectionsContext.currentPage?.totalPages) {
            return <MorePagesButton text={t("p.loadNextRecipesPage")} onLoadNextPage={() => loadNextPage(collectionsContext.recipesInCollection?.length || 0)} />
        }
        return null;
    }

    function renderNoData() {
        return <NoContent text={t('p.noElementsInCollection')} />
    }

    function renderModal() {
        return (
            <DeleteFromCollectionDialog
                showModal={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                onSubmit={deleteRecipeFromCollection}
                data={recipeToDelete || initAs()}
            />
        )
    }
}

export default CollectionRecipesColumn;