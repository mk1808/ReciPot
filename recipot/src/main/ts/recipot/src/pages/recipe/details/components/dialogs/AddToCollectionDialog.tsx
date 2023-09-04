import { useRef, useState } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import AddToCollectionForm from "./AddToCollectionForm";
import { useTranslation } from "react-i18next";
import { getEmptyFormSave } from "../../../../../utils/FormInputUtils";
import { FormSave } from "../../../../../data/utilTypes";


function AddToCollectionDialog({ showModal, handleClose  }: { showModal: boolean, handleClose: any}) {
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
        <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={myHandleSubmit} title={t("p.addingToCollection")}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (<>
            <AddToCollectionForm formSave={formSave} ref={form}></AddToCollectionForm>
        </>)
    }

}

export default AddToCollectionDialog;