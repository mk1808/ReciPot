import { useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import { FormSave } from "../../../../data/utilTypes";
import { useTranslation } from "react-i18next";
import AddRecipeFilterForm from "./AddRecipeFilterForm";

function AddRecipeFilterDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();
    const formSave: FormSave = getEmptyFormSave();
    const form = useRef<any>();
    let formContent: any;

    formSave.onSubmit = function (formValue: any) {
        formContent = formValue;
        console.log("zapytanie do backendu")
    }
    formSave.onSuccess = function () {

    }
    formSave.onError = function () {

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