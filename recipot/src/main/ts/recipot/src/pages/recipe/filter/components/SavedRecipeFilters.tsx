import { Stack } from "react-bootstrap";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { RecipeFilter } from "../../../../data/types";
import { useContext } from "react";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";

function SavedRecipeFilters() {

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    function onRecipeFilterDelete(index: number) {
        const recipeFilterId = (recipeFilterContext.savedFilters && recipeFilterContext.savedFilters[index].id) || "";
        savedRecipeFiltersApi.deleteRecipeFilter(recipeFilterId, () => recipeFilterDispatchContext({ type: 'refreshFiltersList' }));
    }

    function onFilterSelect(index: number) {
        recipeFilterDispatchContext(
            {
                type: 'filterSelect',
                activeRecipeFilterId: recipeFilterContext.savedFilters && recipeFilterContext.savedFilters[index].id
            }
        )
    }

    return (
        <Stack className="p-2 text-start" gap={3} >
            {recipeFilterContext.savedFilters?.map(renderRecipeFilter)}
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
                isActive={recipeFilter.id === recipeFilterContext.activeRecipeFilterId}
            />);
    }
}

export default SavedRecipeFilters;