import { useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { FormSave } from "../../../../data/utilTypes";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import { useTranslation } from "react-i18next";
import AddCollectionDialogForm from "./AddCollectionDialogForm";

function AddCollectionDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();
    const formSave: FormSave = getEmptyFormSave();
    const form = useRef<any>();
    let formContent: any;
    formSave.onSubmit = function (formValue: any) {
        formContent = formValue;
        console.log(formValue);
    }
    formSave.onSuccess = function () {

    }
    formSave.onError = function () {

    }

    function myHandleSubmit() {
        form.current.submitForm();
    }
    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={myHandleSubmit} title={'p.addingNewCollection'}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (
            <>
                <AddCollectionDialogForm formSave={formSave} ref={form}></AddCollectionDialogForm>

            </>
        )
    }

}

export default AddCollectionDialog;