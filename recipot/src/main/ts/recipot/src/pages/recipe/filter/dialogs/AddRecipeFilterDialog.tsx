import { useContext, useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import AddRecipeFilterForm from "./AddRecipeFilterForm";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import savedRecipeFiltersApi from "../../../../api/SavedRecipeFiltersApi";
import useAlerts from "../../../../hooks/useAlerts";
import { initFormSave } from "../../../../utils/FormInputUtils";
import { RecipeFilter } from "../../../../data/types";

type Props = {
    showModal: boolean,
    onClose: () => any
};

function AddRecipeFilterDialog({
    showModal,
    onClose
}: Props) {

    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const alerts = useAlerts();
    const form = useRef<any>();
    const formSave = initFormSave<RecipeFilter>();

    formSave.onSubmit = function (formValue: any) {
        const newRecipeFilter: any = {
            name: formValue.newFilterName,
            value: JSON.stringify(recipeFilterContext.recipesFilterForm)
        }
        savedRecipeFiltersApi.createRecipeFilter(newRecipeFilter, formSave.onSuccess, formSave.onError);
    }

    formSave.onSuccess = function () {
        alerts.showSuccessAlert(t("p.recipeFilterSaved"));
        recipeFilterDispatchContext({ type: RecipeFilterContextType.RefreshFiltersList });
        onClose();
    }

    formSave.onError = function (response: any) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    async function onSubmit() {
        form.current.submitForm();
    }

    return (
        <CustomModal
            shouldShow={showModal}
            onClose={onClose}
            title='p.recipeFilterSave'
            onSubmit={onSubmit}
        >
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (
            <>
                <span>{t('p.recipeFilterSaveInfo')}</span>
                <AddRecipeFilterForm formSave={formSave} ref={form} />
            </>
        )
    }
}

export default AddRecipeFilterDialog;