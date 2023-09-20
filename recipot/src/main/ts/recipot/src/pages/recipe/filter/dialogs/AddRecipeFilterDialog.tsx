import { useContext, useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import { useTranslation } from "react-i18next";
import AddRecipeFilterForm from "./AddRecipeFilterForm";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import { AlertsDispatchContext } from "../../../../context/AlertContext";
import { onShowAlertOnErrorResponse, showSuccessAlert } from "../../../../utils/RestUtils";

function AddRecipeFilterDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const alertsDispatchContext = useContext(AlertsDispatchContext);

    const formSave: any = getEmptyFormSave();
    const form = useRef<any>();

    formSave.onSubmit = function (formValue: any) {
        const newRecipeFilter: any = {
            name: formValue.newFilterName,
            value: JSON.stringify(recipeFilterContext.recipesFilterForm)
        }
        savedRecipeFiltersApi.createRecipeFilter(newRecipeFilter, this.onSuccess, this.onError)
    }
    formSave.onSuccess = function () {
        showSuccessAlert(t("p.recipeFilterSaved"), alertsDispatchContext);
        recipeFilterDispatchContext({
            type: "refreshFiltersList"
        })
        handleClose();
    }
    formSave.onError = function (response: any) {
        onShowAlertOnErrorResponse(response, alertsDispatchContext, t);
    }
    async function myHandleSubmit() {
        form.current.submitForm();
    }

    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} title={'p.recipeFilterSave'}
            handleSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (
            <>
                <span>{t('p.recipeFilterSaveInfo')}</span>
                <AddRecipeFilterForm formSave={formSave} ref={form}></AddRecipeFilterForm>
            </>
        )
    }
}

export default AddRecipeFilterDialog;