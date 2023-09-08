import { useTranslation } from "react-i18next";
import MyInput from "../../../../components/basicUi/MyInput";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { AddRecipeContext, AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";
import { useContext } from "react";

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
                return fieldValue && fieldValue.length > 3;
            }
            case 'description': {
                return true
                // return validateEmail(action.value);
            }
            case 'image': {
                return fieldValue && fieldValue.length > 3;
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
        </div>
    );
    function renderNameInput() {
        return (
            <MyInput
                name="name"
                label="Nazwa"
                onChange={(value: string) => onChange(value, "name")}
                required={true}
                isValid={getValidity("name")}
            />
        )
    }

    function renderDescriptionInput() {
        return (
            <MyTextarea
                required={true}
                isValid={getValidity("description")}
                name="description"
                label="Opis"
                placeholder="Input test 1"
                rows={5}
                onChange={(value: string) => onChange(value, "description")} />
        )
    }

    function renderImageInput() {
        return (
            <MyInput
                name="image"
                label="Zdjęcie"
                onChange={(value: string) => onChange(value, "image")}
                required={true}
                isValid={getValidity("image")}
            />
        )
    }
}



export default UpperLeftSide;