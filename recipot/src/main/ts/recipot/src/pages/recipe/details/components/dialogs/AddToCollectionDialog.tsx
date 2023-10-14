import { useRef } from "react";
import { useTranslation } from "react-i18next";

import AddToCollectionForm from "./AddToCollectionForm";
import recipeCollectionsApi from "../../../../../api/RecipeCollectionsApi";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { Recipe, RecipeCollection, RecipeCollectionItem, Response, SharedRecipe } from "../../../../../data/types";
import useAlerts from "../../../../../hooks/useAlerts";
import { initFormSave } from "../../../../../utils/FormInputUtils";
import { initAs } from "../../../../../utils/ObjectUtils";

type Props = {
    showModal: boolean,
    onClose: () => any,
    data: Recipe
};

function AddToCollectionDialog({
    showModal,
    onClose,
    data
}: Props) {

    const { t } = useTranslation();
    const alerts = useAlerts();    
    const form = useRef<any>();
    const formSave = initFormSave<RecipeCollection>();

    formSave.onSubmit = function (formValue: any) {
        if (typeof formValue === 'string') {
            createNewCollection(formValue)
        } else {
            addRecipeToCollection(formValue)
        }
    }

    formSave.onSuccess = function (response: Response<SharedRecipe>) {
        alerts.showSuccessAlert(t('p.addedToCollection'));
        onClose();
    }
    
    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
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

    async function myHandleSubmit() {
        form.current.submitForm();
    }

    return (
        <CustomModal shouldShow={showModal} onClose={onClose} onSubmit={myHandleSubmit} title={t("p.addingToCollection")}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return <AddToCollectionForm formSave={formSave} ref={form} />
    }
}

export default AddToCollectionDialog;