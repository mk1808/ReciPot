import { useTranslation } from "react-i18next";
import MyInput from "../../../../components/basicUi/MyInput";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { AddRecipeContext, AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";
import { useContext } from "react";
import { inputAttributes, inputAttributesForContext } from "../../../../utils/FormInputUtils";

function UpperLeftSide() {
    const { t } = useTranslation();
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;

    function onChange(fieldValue: any, fieldName: string) {
        addRecipeDispatchContext({
            type: "onChange",
            fieldName,
            fieldValue,
            fieldValidity: checkInputValidity(fieldValue, fieldName)
        })
    }

    function checkInputValidity(fieldValue: any, fieldName: string) {
        switch (fieldName) {
            case 'name': {
                return !!(fieldValue && fieldValue.length > 3);
            }
            case 'image': {
                return !!(fieldValue && fieldValue.length > 3);
            }
            default: {
                return true;
            }
        }
    }
    function getValidity(fieldName: string) {
        return formFields?.formValidity ? formFields?.formValidity[fieldName] : false;
    }
    return (
        <div className="text-start">
            {renderNameInput()}
            {renderDescriptionInput()}
            {renderImageInput()}
            {renderUrlInput()}
        </div>
    );
    function renderNameInput() {
        return (
            <MyInput
                label={t('p.name')}
                placeholder={t('p.name')}
                required={true}
                {...inputAttributesForContext("name", onChange, getValidity)}
            />
        )
    }

    function renderDescriptionInput() {
        return (
            <MyTextarea
                label={t('p.description')}
                placeholder={t('p.description')}
                rows={5}
                {...inputAttributesForContext("description", onChange, getValidity)}
            />
        )
    }

    function renderImageInput() {
        return (
            <MyInput
                label={t('p.image')}
                placeholder={t('p.image')}
                required={true}
                {...inputAttributesForContext("image", onChange, getValidity)}
            />
        )
    }

    function renderUrlInput(){
        return (
            <MyInput
                label={t('p.url')}
                placeholder={t('p.url')}
                {...inputAttributesForContext("url", onChange, getValidity)}
            />
        )
    }
}



export default UpperLeftSide;