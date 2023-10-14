import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import AddCollectionDialogForm from "./AddCollectionDialogForm";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import CustomModal from "../../../../components/basicUi/CustomModal";
import { RecipeCollection, Response } from "../../../../data/types";
import useAlerts from "../../../../hooks/useAlerts";
import { initFormSave } from "../../../../utils/FormInputUtils";
import { RecipeCollectionListContextType, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";

type Props = {
    showModal: boolean,
    onClose: any
};

function AddCollectionDialog({
    showModal,
    onClose
}: Props) {

    const { t } = useTranslation();
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);
    const form = useRef<any>();
    const alerts = useAlerts();
    const formSave = initFormSave<RecipeCollection>();

    formSave.onSubmit = function (formValue: any) {
        const newCollection = { name: formValue.newCollectionName } as RecipeCollection
        recipeCollectionsApi.createCollection(newCollection, formSave.onSuccess, formSave.onError)
    }

    formSave.onSuccess = function () {
        alerts.showSuccessAlert(t("p.recipesCollectionSaved"));
        collectionsDispatchContext({ type: RecipeCollectionListContextType.RefreshCollectionsList });
        onClose();
    }

    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    function onSubmit() {
        form.current.submitForm();
    }

    return (
        <CustomModal
            shouldShow={showModal}
            onClose={onClose}
            onSubmit={onSubmit}
            title='p.addingNewCollection'
        >
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return <AddCollectionDialogForm formSave={formSave} ref={form} />
    }
}

export default AddCollectionDialog;