import { useRef, useContext } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import AddToCollectionForm from "./AddToCollectionForm";
import { useTranslation } from "react-i18next";
import { getEmptyFormSave } from "../../../../../utils/FormInputUtils";
import { FormSave } from "../../../../../data/utilTypes";
import { Recipe, RecipeCollection, RecipeCollectionItem, Response, SharedRecipe } from "../../../../../data/types";
import { initAs } from "../../../../../utils/ObjectUtils";
import { onShowAlertOnErrorResponse, showSuccessAlert } from "../../../../../utils/RestUtils";
import { AlertsDispatchContext } from "../../../../../context/AlertContext";
import recipeCollectionsApi from "../../../../../api/RecipeCollectionsApi";


function AddToCollectionDialog({ showModal, handleClose, data }: { showModal: boolean, handleClose: any, data: Recipe }) {
    const { t } = useTranslation();
    const formSave: any = getEmptyFormSave();
    const form = useRef<any>();
    const alertDispatch = useContext(AlertsDispatchContext);

    formSave.onSubmit = function (formValue: any) {
        if (typeof formValue === 'string') {
            createNewCollection(formValue)
        } else {
            addRecipeToCollection(formValue)
        }
    }

    function createNewCollection(collectionName: string) {
        const newCollection = { name: collectionName } as RecipeCollection
        recipeCollectionsApi.createCollection(newCollection, onNewCollectionCreated, formSave.onError)
    }

    function onNewCollectionCreated(response: Response<RecipeCollection>) {
        showSuccessAlert(t("p.recipesCollectionSaved"), alertDispatch);
        addRecipeToCollection(response.value)
    }

    function addRecipeToCollection(collection: RecipeCollection) {
        const recipeCollectionItem: RecipeCollectionItem = initAs<RecipeCollectionItem>({ recipe: data })
        recipeCollectionsApi.addCollectionItem(collection.id, recipeCollectionItem, formSave.onSuccess, formSave.onError);
    }

    formSave.onSuccess = function (response: Response<SharedRecipe>) {
        showSuccessAlert(t('p.addedToCollection'), alertDispatch);
        handleClose();
    }
    formSave.onError = function (response: Response<any>) {
        onShowAlertOnErrorResponse(response, alertDispatch, t);
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