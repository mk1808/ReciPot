import { Stack } from "react-bootstrap";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { useContext } from "react";
import { RecipeCollectionListContext, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import { RecipeCollection } from "../../../../data/types";

function CollectionList() {
    const collectionsContext = useContext(RecipeCollectionListContext);
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);

    function onCollectionSelectCallback(index: number) {
        collectionsDispatchContext({
            type: 'collectionSelect',
            activeCollectionId: (collectionsContext.collections || [])[index].id
        });
    }

    function onCollectionDeleteCallback(index: number) {
        collectionsDispatchContext({
            type: 'deleteCollection',
            value: (collectionsContext.collections || [])[index].id
        });
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