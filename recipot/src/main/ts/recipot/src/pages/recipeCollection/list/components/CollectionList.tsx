import { Stack } from "react-bootstrap";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { useContext } from "react";
import { RecipeCollectionListContext, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import { RecipeCollection } from "../../../../data/types";
import { useTranslation } from "react-i18next";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { showSuccessAlert } from "../../../../utils/RestUtils";
import { AlertsDispatchContext } from "../../../../context/AlertContext";

function CollectionList() {
    const collectionsContext = useContext(RecipeCollectionListContext);
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const alertsDispatchContext = useContext(AlertsDispatchContext);
    const { t } = useTranslation();

    function onCollectionSelectCallback(index: number) {
        collectionsDispatchContext({
            type: 'collectionSelect',
            activeCollectionId: (collectionsContext.collections || [])[index].id
        });
    }

    function onCollectionDeleteCallback(index: number) {
        recipeCollectionsApi.deleteCollection((collectionsContext.collections || [])[index].id, onCollectionDeleteResponse);
    }

    function onCollectionDeleteResponse(response: any) {
        showSuccessAlert(t(response.message), alertsDispatchContext);
        collectionsDispatchContext({ type: 'refreshCollectionsList' })
    }

    return (
        <Stack gap={3}>
            {collectionsContext.collections?.map(renderCollection)}
        </Stack>
    );

    function renderCollection(collection: RecipeCollection, index: number) {
        return (
            <ComplexListElement
                key={collection.id}
                index={index}
                onSelectCallback={onCollectionSelectCallback}
                onDeleteCallback={onCollectionDeleteCallback}
                element={collection}
                isActive={collection.id === collectionsContext.activeCollectionId}
            />);
    }

}

export default CollectionList;