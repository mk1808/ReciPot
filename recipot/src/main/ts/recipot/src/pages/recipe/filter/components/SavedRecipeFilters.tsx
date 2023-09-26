import { Stack } from "react-bootstrap";
import ComplexListElement from "../../../../components/complex/ComplexListElement";
import { RecipeFilter } from "../../../../data/types";
import { useContext, useEffect } from "react";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import { showSuccessAlert } from "../../../../utils/RestUtils";
import { AlertsDispatchContext } from "../../../../context/AlertContext";
import { useTranslation } from "react-i18next";

function SavedRecipeFilters() {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const alertsDispatchContext = useContext(AlertsDispatchContext);

    useEffect(() => {
        recipeFilterDispatchContext({ type: 'refreshFiltersList' })
    }, []);

    function onRecipeFilterDelete(index: number) {
        const recipeFilterId = (recipeFilterContext.savedFilters && recipeFilterContext.savedFilters[index].id) || "";
        savedRecipeFiltersApi.deleteRecipeFilter(recipeFilterId, onRecipeFilterDeleteResponse);
    }

    function onRecipeFilterDeleteResponse(response: any) {
        showSuccessAlert(t(response.message), alertsDispatchContext);
        recipeFilterDispatchContext({ type: 'refreshFiltersList' })
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