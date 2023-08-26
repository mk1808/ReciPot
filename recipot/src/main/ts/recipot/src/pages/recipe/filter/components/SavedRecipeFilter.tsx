import { useState } from "react";
import { RecipeFilter } from "../../../../data/types";
import { Stack } from "react-bootstrap";
import { FaTrashCan, FaCheck, FaBan } from "react-icons/fa6";

function SavedRecipeFilter({
    recipeFilter,
    onDeleteCallback,
    onFilterSelectCallback
}: {
    recipeFilter: RecipeFilter,
    onDeleteCallback: (recipeFilter: RecipeFilter) => any,
    onFilterSelectCallback: (recipeFilter: RecipeFilter) => any
}) {
    const [isDeleteMode, setDeleteMode] = useState(false);

    function onFilterSelect() {
        onFilterSelectCallback(recipeFilter);
    }

    function onDeleteClick(event: any) {
        event.stopPropagation();
        setDeleteMode(true);
    }

    function onConfirmClick(event: any) {
        event.stopPropagation();
        onDeleteCallback(recipeFilter);
    }

    function onCancelClick(event: any) {
        event.stopPropagation();
        setDeleteMode(false);
    }

    return (
        <Stack direction="horizontal" className=" justify-content-between saved-recipe-filter" onClick={onFilterSelect}>
            {renderRecipeFilterName()}
            {renderActions()}
        </Stack>
    );

    function renderRecipeFilterName() {
        return <span>{recipeFilter.name}</span>
    }

    function renderActions() {
        return isDeleteMode ? renderConfirmActions() : renderDeleteAction();
    }

    function renderDeleteAction() {
        return <FaTrashCan onClick={onDeleteClick} className="action-icon" />;
    }

    function renderConfirmActions() {
        return (
            <div>
                <FaCheck onClick={onConfirmClick} className="action-icon" />
                <FaBan onClick={onCancelClick} className="action-icon" />
            </div>
        );
    }

}

export default SavedRecipeFilter;