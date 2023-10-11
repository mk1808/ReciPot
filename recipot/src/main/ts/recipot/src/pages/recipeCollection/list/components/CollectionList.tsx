import { Stack } from "react-bootstrap";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { useContext } from "react";
import { RecipeCollectionListContext, RecipeCollectionListContextType, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import { RecipeCollection } from "../../../../data/types";
import { useTranslation } from "react-i18next";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { getCollectionName } from "../../../../utils/TextUtils";
import useAlerts from "../../../../hooks/useAlerts";

function CollectionList() {
    const { t } = useTranslation();
    const collectionsContext = useContext(RecipeCollectionListContext);
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const alerts = useAlerts();

    function onCollectionSelect(index: number) {
        collectionsDispatchContext({
            type: RecipeCollectionListContextType.CollectionSelect,
            activeCollectionId: (collectionsContext.collections || [])[index].id
        });
    }

    function onCollectionDelete(index: number) {
        recipeCollectionsApi.deleteCollection((collectionsContext.collections || [])[index].id, onCollectionDeleteResponse);
    }

    function onCollectionDeleteResponse(response: any) {
        alerts.showSuccessAlert(t(response.message));
        collectionsDispatchContext({ type: RecipeCollectionListContextType.RefreshCollectionsList })
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
                onSelect={onCollectionSelect}
                onDelete={onCollectionDelete}
                element={collection}
                isActive={collection.id === collectionsContext.activeCollectionId}
                getElementName={getCollectionName}
            />
        );
    }

}

export default CollectionList;