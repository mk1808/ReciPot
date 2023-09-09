import { createContext, useReducer, useRef } from "react";
import { FormSave } from "../data/utilTypes";
import { getEmptyFormSave } from "../utils/FormInputUtils";
import { convertToObjects } from "../utils/AddRecipeContextUtil";

export const AddRecipeContext = createContext<any>([]);

export const AddRecipeDispatchContext = createContext<Function>(() => { });

function AddRecipeContextProvider({ children }: any) {

    const formSave = useRef<FormSave>(getEmptyFormSave());

    const [fields, dispatch]: [any, Function] = useReducer(
        addRecipeReducer,
        []
    );

    formSave.current.onSubmit = function (formValue: any) {

        convertToObjects(formValue.hashTag);
        console.log("formval")
        console.log(formValue)
    }
    formSave.current.onSuccess = function () {

    }
    formSave.current.onError = function () {

    }

    function addRecipeReducer(fields: any, action: any) {
        switch (action.type) {
            case 'onChange': {
                if (action.isIngredient) {
                    if (fields.formValue[action.fieldName][action.index]) {
                        fields.formValue[action.fieldName][action.index][action.subFieldName] = action.fieldValue;
                        fields.formValidity[action.fieldName][action.index][action.subFieldName] = action.fieldValidity;
                    }
                    return {
                        ...fields,
                        formValue: {
                            ...fields.formValue,
                        },
                        formValidity: {
                            ...fields.formValidity,

                        },
                    };
                }
                return {
                    ...fields,
                    formValue: {
                        ...fields.formValue,
                        [action.fieldName]: action.fieldValue
                    },
                    formValidity: {
                        ...fields.formValidity,
                        [action.fieldName]: action.fieldValidity
                    },
                };
            }
            case 'onSubmit': {
                onSubmit(fields);
                return fields;
            }
            case 'onAdd': {
                let ingredients: any;
                let ingredientsValidity: any
                if (action.isIngredient) {

                    if (fields.formValue[action.fieldName] == null) {
                        ingredients = [];
                    } else {
                        ingredients = [...fields.formValue[action.fieldName]];
                    }
                    ingredients.push({ ...action.basicObj });

                    if (fields.formValidity[action.fieldName] == null) {
                        ingredientsValidity = [];
                    } else {
                        ingredientsValidity = [...fields.formValidity[action.fieldName]];
                    }
                    ingredientsValidity.push({ ...action.basicObj });

                }
                return {
                    ...fields,
                    formValue: {
                        ...fields.formValue,
                        [action.fieldName]: ingredients
                    },
                    formValidity: {
                        ...fields.formValidity,
                        [action.fieldName]: ingredientsValidity
                    },
                };
            }
            case 'onDelete': {
                let el = [...(fields.formValue[action.fieldName]).slice(0, action.index), ...(fields.formValue[action.fieldName]).slice(action.index + 1)]
                let elValid = [...(fields.formValidity[action.fieldName]).slice(0, action.index), ...(fields.formValidity[action.fieldName]).slice(action.index + 1)]

                return {
                    ...fields,
                    formValue: {
                        ...fields.formValue,
                        [action.fieldName]: el
                    },
                    formValidity: {
                        ...fields.formValue,
                        [action.fieldName]: elValid
                    },
                };
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    function onSubmit(fields: any) {
        for (const field in fields.formValidity) {
            if (!fields.formValidity[field]) {
                // return false; 
            }
        }
        console.log(fields.formValidity)
        formSave.current.onSubmit(fields.formValue);
    }

    return (
        <AddRecipeContext.Provider value={{ fields }}>
            <AddRecipeDispatchContext.Provider value={dispatch}>
                {children}
            </AddRecipeDispatchContext.Provider>
        </AddRecipeContext.Provider>
    );
}

export default AddRecipeContextProvider;