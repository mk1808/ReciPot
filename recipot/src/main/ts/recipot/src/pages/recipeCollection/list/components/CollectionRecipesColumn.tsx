import { useContext, useState } from "react";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Stack } from "react-bootstrap";
import { RecipeCollectionListContext, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import { useTranslation } from "react-i18next";
import { Recipe, RecipeCollection } from "../../../../data/types";
import MyHeader from "../../../../components/basicUi/MyHeader";
import Tooltip from "../../../../components/basicUi/Tooltip";
import MyButton from "../../../../components/basicUi/MyButton";
import { FaFolderMinus } from "react-icons/fa6";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import DeleteFromCollectionDialog from "../dialogs/DeleteFromCollectionDialog";
import { initAs } from "../../../../utils/ObjectUtils";
import { getCollectionName } from "../../../../utils/TextUtils";
import NoContent from "../../../../components/complex/NoContent";
import MySpinner from "../../../../components/basicUi/MySpinner";
import PageDivider from "../../../../components/basicUi/PageDivider";
import MorePagesButton from "../../../../components/basicUi/MorePagesButton";
import useAlerts from "../../../../hooks/useAlerts";
import useMyNav from "../../../../hooks/useMyNav";

function CollectionRecipesColumn() {
    const collectionsContext = useContext(RecipeCollectionListContext);
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const alerts = useAlerts();
    const { t } = useTranslation();
    const nav = useMyNav();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [nextPageIndex, setNextPageIndex] = useState(0);
    const [recipeToDelete, setRecipeToDelete] = useState<Recipe | any>();
    const onGoToRecipe = (recipe: Recipe, event: any,) => nav.openInBackground({ id: recipe.id }, event);
    const activeRecipeCollection: RecipeCollection | undefined = collectionsContext.collections?.filter(collection => collection.id === collectionsContext.activeCollectionId)[0];
    const isLoaded = collectionsContext.isLoaded;
    function deleteRecipeShowModal(recipe: Recipe, index: number) {
        setShowModalDelete(true);
        setRecipeToDelete(recipe);
        setNextPageIndex(index);
    }

    function deleteRecipeFromCollection() {
        recipeCollectionsApi.deleteRecipeFromCollection(activeRecipeCollection?.id || "", recipeToDelete.id, () => onDeleteSuccess(nextPageIndex))
    }

    function onDeleteSuccess(index: number) {
        alerts.showSuccessAlert(t('p.recipeRemovedFromCollection'));
        loadNextPage(index)
    }

    function loadNextPage(index: number) {
        collectionsDispatchContext({
            type: 'loadRecipesPage',
            value: index
        })
    }

    return (
        <div>
            {renderHeader()}
            {!isLoaded && <MySpinner />}
            {isLoaded && ((collectionsContext.currentPage?.totalElements || 0) > 0 ? renderContent() : renderNoData())}
        </div>
    );

    function renderContent() {
        return (
            <>
                {collectionsContext.recipesInCollection?.map(renderRecipesPage)}
                {renderLoadNextPageButton()}
            </>
        );
    }

    function renderHeader() {
        return (
            <MyHeader title={`${t('p.recipeCollectionListHeader')}: ${t(getCollectionName(activeRecipeCollection, t))}`} />
        );
    }

    function renderRecipesPage(recipes: Recipe[], index: number) {
        const pageId = "recipesPage_" + index;
        return (
            <div key={pageId} id={pageId}>
                <PageDivider text={`${t('p.page')} ${index + 1}`} />
                <Stack direction="horizontal" className="flex-wrap justify-content-center" gap={3}>
                    {recipes?.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onGoToRecipe={onGoToRecipe} additionalFunctionElement={renderDeleteFromCollection(recipe, index)} />)}
                </Stack>
            </div>
        );
    };

    function renderDeleteFromCollection(recipe: Recipe, index: number) {
        return activeRecipeCollection?.canDelete && (
            <>
                <Tooltip title={t('p.removeFromCollection')}>
                    <MyButton.Primary onClick={() => { deleteRecipeShowModal(recipe, index) }} className="round"><FaFolderMinus /></MyButton.Primary>
                </Tooltip>
                {renderModal()}
            </>
        )
    }

    function renderLoadNextPageButton() {
        const currentPage = collectionsContext.currentPage;
        if (collectionsContext.recipesInCollection?.length !== currentPage?.totalPages) {
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
                data={recipeToDelete || initAs()} />
        )
    }
}

export default CollectionRecipesColumn;