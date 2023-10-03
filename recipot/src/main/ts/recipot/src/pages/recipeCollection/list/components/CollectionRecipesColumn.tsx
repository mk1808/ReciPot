import { useContext, useState } from "react";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { Stack } from "react-bootstrap";
import { RecipeCollectionListContext, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import { useTranslation } from "react-i18next";
import { Recipe, RecipeCollection } from "../../../../data/types";
import { useNavigate } from "react-router-dom";
import { openInBackground } from "../../../../utils/NavigationUtils";
import MyHeader from "../../../../components/basicUi/MyHeader";
import Tooltip from "../../../../components/basicUi/Tooltip";
import MyButton from "../../../../components/basicUi/MyButton";
import { FaFolderMinus } from "react-icons/fa6";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { AlertsDispatchContext } from "../../../../context/AlertContext";
import { showSuccessAlert } from "../../../../utils/RestUtils";
import DeleteFromCollectionDialog from "../dialogs/DeleteFromCollectionDialog";
import { initAs } from "../../../../utils/ObjectUtils";
import { getCollectionName } from "../../../../utils/TextUtils";

function CollectionRecipesColumn() {
    const collectionsContext = useContext(RecipeCollectionListContext);
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const alertDispatch = useContext(AlertsDispatchContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [nextPageIndex, setNextPageIndex] = useState(0);
    const [recipeToDelete, setRecipeToDelete] = useState<Recipe | any>();
    const recipeCallback = (recipe: Recipe, event: any,) => openInBackground(`/recipes/${recipe.id}`, event, navigate);
    const activeRecipeCollection: RecipeCollection | undefined = collectionsContext.collections?.filter(collection => collection.id === collectionsContext.activeCollectionId)[0];

    function deleteRecipeShowModal(recipe: Recipe, index: number) {
        setShowModalDelete(true);
        setRecipeToDelete(recipe);
        setNextPageIndex(index);
    }

    function deleteRecipeFromCollection() {
        recipeCollectionsApi.deleteRecipeFromCollection(activeRecipeCollection?.id || "", recipeToDelete.id, () => onDeleteSuccess(nextPageIndex))
    }

    function onDeleteSuccess(index: number) {
        showSuccessAlert(t('p.recipeRemovedFromCollection'), alertDispatch);
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
            {(collectionsContext.currentPage?.totalElements || 0) > 0 ? renderContent() : renderNoData()}
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
            <>
                <MyHeader title={`${t('p.recipeCollectionListHeader')}: ${t(getCollectionName(activeRecipeCollection, t))}`}></MyHeader>
            </>
        );
    }

    function renderRecipesPage(recipes: Recipe[], index: number) {
        const pageId = "recipesPage_" + index;
        return (
            <div key={pageId} id={pageId}>
                <h3>-------------- {t('p.page')} {index + 1} --------------</h3>
                <Stack direction="horizontal" className="flex-wrap justify-content-center" gap={3}>
                    {recipes?.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} recipeCallback={recipeCallback} additionalFunctionElement={renderDeleteFromCollection(recipe, index)}></RecipeCard >)}
                </Stack>
            </div>
        );
    };

    function renderDeleteFromCollection(recipe: Recipe, index: number) {
        return activeRecipeCollection?.canDelete && (
            <>
                <Tooltip placement="bottom" title={t('p.removeFromCollection')}>
                    <MyButton.Primary onClick={() => { deleteRecipeShowModal(recipe, index) }} className="round"><FaFolderMinus /></MyButton.Primary>
                </Tooltip>
                {renderModal()}
            </>
        )
    }

    function renderLoadNextPageButton() {
        const currentPage = collectionsContext.currentPage;
        if (collectionsContext.recipesInCollection?.length !== currentPage?.totalPages) {
            return (
                <MyButton.Primary onClick={() => loadNextPage(collectionsContext.recipesInCollection?.length || 0)}>
                    {t("p.loadNextRecipesPage")}
                </MyButton.Primary>
            )
        }
        return null;
    }

    function renderNoData() {
        return (
            <div className="text-center">
                <h2>{t("p.noData")}</h2>
            </div>
        );
    }

    function renderModal() {
        return <DeleteFromCollectionDialog
            showModal={showModalDelete}
            handleClose={() => setShowModalDelete(false)}
            handleSubmit={deleteRecipeFromCollection}
            data={recipeToDelete || initAs()} />
    }
}

export default CollectionRecipesColumn;