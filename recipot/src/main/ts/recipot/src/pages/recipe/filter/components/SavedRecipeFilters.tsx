import { Stack } from "react-bootstrap";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { RecipeFilter } from "../../../../data/types";
import { useContext } from "react";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import { useTranslation } from "react-i18next";
import useAlerts from "../../../../hooks/useAlerts";

function SavedRecipeFilters() {
    const { t } = useTranslation();
    const alerts = useAlerts();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    const isActive = (recipeFilter: RecipeFilter) => recipeFilter.id === recipeFilterContext.activeRecipeFilterId;

    function onRecipeFilterDeleteResponse(response: any) {
        alerts.showSuccessAlert(t(response.message));
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.RefreshFiltersList
        });
    }

    function onFilterSelect(recipeFilter: RecipeFilter) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.FilterSelect,
            activeRecipeFilterId: recipeFilter.id
        });
    }

    function onRecipeFilterDelete(recipeFilter: RecipeFilter) {
        savedRecipeFiltersApi.deleteRecipeFilter(recipeFilter.id, onRecipeFilterDeleteResponse);
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
                onSelect={() => onFilterSelect(recipeFilter)}
                onDelete={() => onRecipeFilterDelete(recipeFilter)}
                element={recipeFilter}
                isActive={isActive(recipeFilter)}
            />
        );
    }
}

export default SavedRecipeFilters;