import { useRef, useContext } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import AddToCollectionForm from "./AddToCollectionForm";
import { useTranslation } from "react-i18next";
import { Recipe, RecipeCollection, RecipeCollectionItem, Response, SharedRecipe } from "../../../../../data/types";
import { initAs } from "../../../../../utils/ObjectUtils";
import recipeCollectionsApi from "../../../../../api/RecipeCollectionsApi";
import useAlerts from "../../../../../hooks/useAlerts";
import { initFormSave } from "../../../../../utils/FormInputUtils";


function AddToCollectionDialog({ showModal, handleClose, data }: { showModal: boolean, handleClose: any, data: Recipe }) {
    const { t } = useTranslation();
    const alerts = useAlerts();
    const formSave = initFormSave<RecipeCollection>();
    const form = useRef<any>();

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
        alerts.showSuccessAlert(t("p.recipesCollectionSaved"));
        addRecipeToCollection(response.value)
    }

    function addRecipeToCollection(collection: RecipeCollection) {
        const recipeCollectionItem: RecipeCollectionItem = initAs<RecipeCollectionItem>({ recipe: data })
        recipeCollectionsApi.addCollectionItem(collection.id, recipeCollectionItem, formSave.onSuccess, formSave.onError);
    }

    formSave.onSuccess = function (response: Response<SharedRecipe>) {
        alerts.showSuccessAlert(t('p.addedToCollection'));
        handleClose();
    }
    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
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
        return <AddToCollectionForm formSave={formSave} ref={form}/>
    }

}

export default AddToCollectionDialog;