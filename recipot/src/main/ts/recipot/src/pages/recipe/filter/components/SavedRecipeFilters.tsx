import { Stack } from "react-bootstrap";
import SavedRecipeFilter from "./SavedRecipeFilter";
import { RecipeFilter } from "../../../../data/types";
import { initAs } from "../../../../utils/ObjectUtils";

function SavedRecipeFilters() {
    function getRecipeFilter(id: number): RecipeFilter {
        return initAs<RecipeFilter>({ id: id, name: "recipe filter " + id })
    }

    function onRecipeFilterDelete(recipeFilter: RecipeFilter) {
        console.log("recipeDeleted", recipeFilter)
    }

    function onFilterSelect(recipeFilter: RecipeFilter) {
        console.log("recipeSelected", recipeFilter)
    }

    return (
        <Stack className="p-2 text-start saved-recipe-filters" gap={3} >
            <SavedRecipeFilter recipeFilter={getRecipeFilter(1)} onDeleteCallback={onRecipeFilterDelete} onFilterSelectCallback={onFilterSelect} />
            <SavedRecipeFilter recipeFilter={getRecipeFilter(2)} onDeleteCallback={onRecipeFilterDelete} onFilterSelectCallback={onFilterSelect} />
            <SavedRecipeFilter recipeFilter={getRecipeFilter(3)} onDeleteCallback={onRecipeFilterDelete} onFilterSelectCallback={onFilterSelect} />
            <SavedRecipeFilter recipeFilter={getRecipeFilter(4)} onDeleteCallback={onRecipeFilterDelete} onFilterSelectCallback={onFilterSelect} />
            <SavedRecipeFilter recipeFilter={getRecipeFilter(5)} onDeleteCallback={onRecipeFilterDelete} onFilterSelectCallback={onFilterSelect} />
            <SavedRecipeFilter recipeFilter={getRecipeFilter(6)} onDeleteCallback={onRecipeFilterDelete} onFilterSelectCallback={onFilterSelect} />
        </Stack>
    )

}

export default SavedRecipeFilters;