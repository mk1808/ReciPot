import { Stack } from "react-bootstrap";
import { initAs } from "../../../../utils/ObjectUtils";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { RecipeFilter } from "../../../../data/types";
import { useState } from "react";

function SavedRecipeFilters() {
    const [activeRecipeFilterIndex, setActiveRecipeFilterIndex] = useState<number | null>(null);

    function getRecipeFilters() {
        const result: RecipeFilter[] = [];
        for (let i = 0; i < 5; i++) {
            result.push(initAs<RecipeFilter>({ id: i, name: "recipe filter " + i }))
        }
        return result
    }

    function onRecipeFilterDelete(index: number) {
        console.log("recipeFilterDeleted", index)
    }

    function onFilterSelect(index: number) {
        setActiveRecipeFilterIndex(index);
        console.log("recipeFilterSelected", index)
    }

    return (
        <Stack className="p-2 text-start" gap={3} >
            {getRecipeFilters().map(renderRecipeFilter)}
        </Stack>
    )
    function renderRecipeFilter(recipeFilter: RecipeFilter, index: number) {
        return (
            <ComplexListElement
                key={recipeFilter.id}
                index={index}
                onSelectCallback={onFilterSelect}
                onDeleteCallback={onRecipeFilterDelete}
                element={recipeFilter}
                isActive={index === activeRecipeFilterIndex}
            />);
    }
}

export default SavedRecipeFilters;