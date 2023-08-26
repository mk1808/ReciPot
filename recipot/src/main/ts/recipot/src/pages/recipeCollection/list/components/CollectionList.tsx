import { Stack } from "react-bootstrap";
import { AppUser, RecipeCollection } from "../../../../data/types";
import { initAs } from "../../../../utils/ObjectUtils";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { useState } from "react";

function CollectionList() {
    const [activeCollectionIndex, setActiveCollectionIndex] = useState(0);

    function getCollections() {
        const result: RecipeCollection[] = [];
        for (let i = 0; i < 5; i++) {
            result.push({ id: String(i), canDelete: i > 2, name: "recipe collection " + i, owner: initAs<AppUser>(), recipeCollectionItems: [], user: initAs<AppUser>() })
        }
        return result
    }

    function onCollectionSelectCallback(index: number) {
        setActiveCollectionIndex(index);
        console.log("recipeCollectionSelected", index)
    }

    function onCollectionDeleteCallback(index: number) {
        console.log("recipeCollectionDeleted", index)
    }

    return (
        <Stack gap={3}>
            {getCollections().map(renderCollection)}
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
                isActive={index === activeCollectionIndex}
            />);
    }

}

export default CollectionList;