import { useContext, useRef } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import AddCollectionDialogForm from "./AddCollectionDialogForm";
import { RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { RecipeCollection, Response } from "../../../../data/types";
import useAlerts from "../../../../hooks/useAlerts";
import { initFormSave } from "../../../../utils/FormInputUtils";

function AddCollectionDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const alerts = useAlerts();  

    const formSave = initFormSave<RecipeCollection>();
    const form = useRef<any>();

    formSave.onSubmit = function (formValue: any) {
        const newCollection = { name: formValue.newCollectionName } as RecipeCollection
        recipeCollectionsApi.createCollection(newCollection, formSave.onSuccess, formSave.onError)
    }
    formSave.onSuccess = function () {
        alerts.showSuccessAlert(t("p.recipesCollectionSaved"));
        collectionsDispatchContext({ type: 'refreshCollectionsList' });
        handleClose();
    }
    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
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