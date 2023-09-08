import { createContext, useReducer, useRef } from "react";
import { FormSave } from "../data/utilTypes";
import { getEmptyFormSave } from "../utils/FormInputUtils";

export const AddRecipeContext = createContext<any>([]);

export const AddRecipeDispatchContext = createContext<Function>(() => { });

function AddRecipeContextProvider({ children }: any) {

    const formSave = useRef<FormSave>(getEmptyFormSave());

    const [fields, dispatch]: [any, Function] = useReducer(
        addRecipeReducer,
        []
    );

    formSave.current.onSubmit = function (formValue: any) {
        console.log("btnz");
        console.log(formValue)
    }
    formSave.current.onSuccess = function () {

    }
    formSave.current.onError = function () {

    }

    function addRecipeReducer(fields: any, action: any) {
        switch (action.type) {
            case 'onChange': {
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
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    function onSubmit(fields: any) {
        for (const field in fields.formValidity) {
            if (!fields.formValidity[field]) { return false; }
        }
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