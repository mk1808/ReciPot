import { useRef, useContext } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import ShareRecipeForm from "./ShareRecipeForm";
import { useTranslation } from "react-i18next";
import { getEmptyFormSave } from "../../../../../utils/FormInputUtils";
import { FormSave } from "../../../../../data/utilTypes";
import { Recipe, Response, SharedRecipe } from "../../../../../data/types";
import { AlertsDispatchContext } from "../../../../../context/AlertContext";
import { initAs } from "../../../../../utils/ObjectUtils";
import recipesApi from "../../../../../api/RecipesApi";
import { onShowAlertOnErrorResponse, showSuccessAlert } from "../../../../../utils/RestUtils";


function ShareRecipeDialog({ showModal, handleClose, data }: { showModal: boolean, handleClose: any, data: Recipe }) {
    const { t } = useTranslation();
    const formSave: any = getEmptyFormSave();
    const form = useRef<any>();

    const alertDispatch = useContext(AlertsDispatchContext);

    formSave.onSubmit = function (formValue: any) {
        const sharedRecipe: SharedRecipe = initAs<SharedRecipe>({
            recipe: { id: data.id },
            receiverUser: {
                login: formValue.receiverUser
            },
            comment: formValue.comment
        })
        recipesApi.share(sharedRecipe, formSave.onSuccess, formSave.onError);
    }
    formSave.onSuccess = function (response: Response<SharedRecipe>) {
        showSuccessAlert(t('p.SHARED_RECIPE'), alertDispatch);
        handleClose();
    }
    formSave.onError = function (response: Response<any>) {
        onShowAlertOnErrorResponse(response, alertDispatch, t);
    }

    async function myHandleSubmit() {
        form.current.submitForm();
    }
    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={myHandleSubmit} title={t("p.recipeSharing")}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (<>
            <span>{t('p.shareRecipeInfo')}</span>
            <ShareRecipeForm formSave={formSave} ref={form}></ShareRecipeForm>
        </>
        )
    }

}

export default ShareRecipeDialog;