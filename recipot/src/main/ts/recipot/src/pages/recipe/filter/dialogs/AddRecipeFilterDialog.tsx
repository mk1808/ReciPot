import { useContext, useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import { useTranslation } from "react-i18next";
import AddRecipeFilterForm from "./AddRecipeFilterForm";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import useAlerts from "../../../../hooks/useAlerts";

function AddRecipeFilterDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const alerts = useAlerts(); 

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
        alerts.showSuccessAlert(t("p.recipeFilterSaved"));
        recipeFilterDispatchContext({
            type: "refreshFiltersList"
        })
        handleClose();
    }
    formSave.onError = function (response: any) {
        alerts.onShowAlertOnErrorResponse(response);
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