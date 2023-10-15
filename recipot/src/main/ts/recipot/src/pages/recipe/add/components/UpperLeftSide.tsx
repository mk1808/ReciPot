import { useContext, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaTrashCan } from "react-icons/fa6";

import MyButton from "../../../../components/basicUi/MyButton";
import MyFileInput from "../../../../components/basicUi/MyFileInput";
import MyImage from "../../../../components/basicUi/MyImage";
import MyInput from "../../../../components/basicUi/MyInput";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
import { initAs } from "../../../../utils/ObjectUtils";
import DeleteRecipeDialog from "../../details/components/dialogs/DeleteRecipeDialog";
import { AddRecipeContext, AddRecipeContextType, AddRecipeDispatchContext } from "../context/AddRecipeContext";




function UpperLeftSide() {
    const { t } = useTranslation();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;
    const editedRecipe = useContext(AddRecipeContext).editedRecipe;

    function onChange(fieldValue: any, fieldName: string) {
        addRecipeDispatchContext({
            type: AddRecipeContextType.OnChange,
            fieldName,
            fieldValue,
            fieldValidity: checkInputValidity(fieldValue, fieldName)
        })
    }

    function onFileSelect(file: any) {
        onChange(file, "imageFile");
        onChange(URL.createObjectURL(file), "image");
    }

    function checkInputValidity(fieldValue: any, fieldName: string) {
        switch (fieldName) {
            case 'name': {
                return !!fieldValue && fieldValue.length > 3;
            }
            case 'imageFile': {
                return !!editedRecipe || !!fieldValue;
            }
            default: {
                return true;
            }
        }
    }

    function getValidity(fieldName: string) {
        return formFields?.formValidity ? formFields?.formValidity[fieldName] : false;
    }

    function getAttributes(name: string) {
        return inputAttrs({
            name,
            onChange,
            getValidity,
            formObject: formFields.formValue,
            type: InputAttrsType.Context
        });
    }

    return (
        <div className="text-start">
            {editedRecipe && renderDeleteButtonModal()}
            {renderNameInput()}
            {renderDescriptionInput()}
            {renderImageInput()}
            {renderUrlInput()}
        </div>
    );

    function renderDeleteButtonModal() {
        return (
            <div className="text-center delete-button">
                <MyButton.OutlineDanger onClick={() => setShowModalDelete(true)}>
                    <FaTrashCan />
                    {t('p.deleteRecipeButton')}
                </MyButton.OutlineDanger>
                {renderModal()}
            </div>
        )
    }

    function renderNameInput() {
        return (
            <MyInput
                label={t('p.name')}
                placeholder={t('p.name')}
                required
                {...getAttributes("name")}
            />
        )
    }

    function renderDescriptionInput() {
        return (
            <MyTextarea
                label={t('p.description')}
                placeholder={t('p.description')}
                rows={5}
                {...getAttributes("description")}
            />
        )
    }

    function renderImageInput() {
        return (
            <Stack direction="horizontal">
                {renderCurrentImage()}
                {renderFileInput()}
            </Stack>
        )
    }

    function renderCurrentImage() {
        return formFields.formValue?.image && <MyImage src={formFields.formValue.image} height={100} />
    }

    function renderFileInput() {
        return (
            <MyFileInput
                className="full-width"
                label={formFields.formValue?.image ? t('p.changeImage') : t('p.image')}
                {...getAttributes("imageFile")}
                onChange={onFileSelect}
            />
        )
    }

    function renderUrlInput() {
        return (
            <MyInput
                label={t('p.url')}
                placeholder={t('p.url')}
                {...getAttributes("url")}
            />
        )
    }

    function renderModal() {
        return (
            <DeleteRecipeDialog
                showModal={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                data={editedRecipe || initAs()}
            />
        );
    }
}

export default UpperLeftSide;