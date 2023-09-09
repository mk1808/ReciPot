import { useContext, useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { FormSave } from "../../../../data/utilTypes";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import { useTranslation } from "react-i18next";
import AddCollectionDialogForm from "./AddCollectionDialogForm";
import { RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";

function AddCollectionDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const formSave: FormSave = getEmptyFormSave();
    const form = useRef<any>();
    let formContent: any;
    formSave.onSubmit = function (formValue: any) {
        formContent = formValue;
        console.log(formValue);
        //TODO: POST recipe collection
        formSave.onSuccess();
    }
    formSave.onSuccess = function () {
        collectionsDispatchContext({ type: 'refreshCollectionsList' });
        handleClose();
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