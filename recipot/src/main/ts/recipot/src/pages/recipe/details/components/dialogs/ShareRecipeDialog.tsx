import { useRef, useState } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import ShareRecipeForm from "./ShareRecipeForm";
import { useTranslation } from "react-i18next";
import { getEmptyFormSave } from "../../../../../utils/FormInputUtils";
import { FormSave } from "../../../../../data/utilTypes";


function ShareRecipeDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();
    const formSave: FormSave = getEmptyFormSave();
    const form = useRef<any>();
    let formContent: any;

    formSave.onSubmit = function (formValue: any) {
        formContent = formValue;
        console.log("zapytanie do backendu")
        console.log(formContent);
    }
    formSave.onSuccess = function () {

    }
    formSave.onError = function () {

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