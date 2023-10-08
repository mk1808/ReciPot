import { useRef } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import ShareRecipeForm from "./ShareRecipeForm";
import { useTranslation } from "react-i18next";
import { Recipe, Response, SharedRecipe } from "../../../../../data/types";
import { initAs } from "../../../../../utils/ObjectUtils";
import recipesApi from "../../../../../api/RecipesApi";
import useAlerts from "../../../../../hooks/useAlerts";
import { initFormSave } from "../../../../../utils/FormInputUtils";


function ShareRecipeDialog({ showModal, handleClose, data }: { showModal: boolean, handleClose: any, data: Recipe }) {
    const { t } = useTranslation();
    const alerts = useAlerts();
    const formSave = initFormSave<SharedRecipe>();
    const form = useRef<any>();

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
        alerts.showSuccessAlert(t('p.SHARED_RECIPE'));
        handleClose();
    }
    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    async function myHandleSubmit() {
        form.current.submitForm();
    }
    return (
        <CustomModal shouldShow={showModal} onClose={handleClose} onSubmit={myHandleSubmit} title={t("p.recipeSharing")}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (
            <>
                <span>{t('p.shareRecipeInfo')}</span>
                <ShareRecipeForm formSave={formSave} ref={form} />
            </>
        )
    }

}

export default ShareRecipeDialog;