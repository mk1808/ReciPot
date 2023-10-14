import { useRef } from "react";
import { useTranslation } from "react-i18next";

import ShareRecipeForm from "./ShareRecipeForm";
import recipesApi from "../../../../../api/RecipesApi";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { Recipe, Response, SharedRecipe } from "../../../../../data/types";
import useAlerts from "../../../../../hooks/useAlerts";
import { initFormSave } from "../../../../../utils/FormInputUtils";
import { initAs } from "../../../../../utils/ObjectUtils";

type Props = {
    showModal: boolean,
    onClose: any,
    data: Recipe
};

function ShareRecipeDialog({
    showModal,
    onClose,
    data }
    : Props) {

    const { t } = useTranslation();
    const alerts = useAlerts();
    const form = useRef<any>();
    const formSave = initFormSave<SharedRecipe>();

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
        onClose();
    }

    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    async function onSubmit() {
        form.current.submitForm();
    }

    return (
        <CustomModal shouldShow={showModal} onClose={onClose} onSubmit={onSubmit} title={t("p.recipeSharing")}>
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