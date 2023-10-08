import { useContext, useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import AddRecipeFilterForm from "./AddRecipeFilterForm";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import useAlerts from "../../../../hooks/useAlerts";
import { initFormSave } from "../../../../utils/FormInputUtils";
import { RecipeFilter } from "../../../../data/types";

function AddRecipeFilterDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const alerts = useAlerts(); 

    const formSave = initFormSave<RecipeFilter>();
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
                <AddRecipeFilterForm formSave={formSave} ref={form}/>
            </>
        )
    }
}

export default AddRecipeFilterDialog;