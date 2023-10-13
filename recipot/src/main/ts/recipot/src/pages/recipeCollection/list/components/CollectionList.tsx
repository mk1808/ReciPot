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

    function onCollectionSelect(collection: RecipeCollection) {
        collectionsDispatchContext({
            type: RecipeCollectionListContextType.CollectionSelect,
            activeCollectionId: collection.id
        });
    }

    function onCollectionDelete(collection: RecipeCollection) {
        recipeCollectionsApi.deleteCollection(collection.id, onCollectionDeleteResponse);
    }

    function onCollectionDeleteResponse(response: any) {
        alerts.showSuccessAlert(t(response.message));
        collectionsDispatchContext({
            type: RecipeCollectionListContextType.RefreshCollectionsList
        });
    }

    function getIsActiveCollection(collection: RecipeCollection) {
        return collection.id === collectionsContext.activeCollectionId
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
                onSelect={() => onCollectionSelect(collection)}
                onDelete={() => onCollectionDelete(collection)}
                element={collection}
                isActive={getIsActiveCollection(collection)}
                getElementName={getCollectionName}
            />
        );
    }

}

export default CollectionList;