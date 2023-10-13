import { createContext, useReducer, useRef, useEffect } from "react";
import { addComplexElemet, getDefaultValidityForEdit, getFormValueForEdit, getNewContextState, onChangeComplexField, prepareToSend, removeComplexElement } from "../../../../utils/AddRecipeContextUtil";
import recipesApi from "../../../../api/RecipesApi";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../data/types";
import { ApiRequestSendManager } from "../../../../utils/ApiRequestSendManager";
import filesApi from "../../../../api/FilesApi";
import useAlerts from "../../../../hooks/useAlerts";
import { FormSave } from "../../../../data/utilTypes";
import { initFormSave } from "../../../../utils/FormInputUtils";
import useMyNav from "../../../../hooks/useMyNav";

type contextStateModel = {
    fields: fieldsStateModel,
    editedRecipe?: any
};

export type fieldsStateModel = {
    formValue?: any,
    formValidity?: any
}

type Props = {
    children: any,
    editedRecipe?: Recipe | any
};

export type ReducerActionProps = {
    type: AddRecipeContextType,
    fieldName?: any,
    index?: any,
    isIngredientOrStep?: boolean,
    subFieldName?: any,
    fieldValue?: any,
    fieldValidity?: any,
    basicObj?: any,
    recipe?: any
}

export enum AddRecipeContextType {
    OnChange = "onChange",
    OnSubmit = "onSubmit",
    OnAdd = "onAdd",
    OnDelete = "onDelete",
    OnRecipeLoaded = "onRecipeLoaded"
};

export const AddRecipeContext = createContext<contextStateModel>({ fields: {} });

export const AddRecipeDispatchContext = createContext<(action: ReducerActionProps) => any>((action: ReducerActionProps) => { });

const saveRecipeRequestManager = ApiRequestSendManager();

function AddRecipeContextProvider({
    children,
    editedRecipe
}: Props) {

    const { t } = useTranslation();
    const nav = useMyNav();
    const alerts = useAlerts();
    const formSave = useRef<FormSave<any>>(initFormSave<any>());
    const [fields, dispatch]: [fieldsStateModel, (actiom: ReducerActionProps) => any] = useReducer(addRecipeReducer, {});

    useEffect(() => {
        if (editedRecipe) {
            fields.formValidity = getDefaultValidityForEdit(fields.formValidity);
            fields.formValue = getFormValueForEdit(editedRecipe);
        }
    }, [editedRecipe])

    function addRecipeReducer(fields: fieldsStateModel, action: ReducerActionProps): fieldsStateModel {
        switch (action.type) {
            case AddRecipeContextType.OnChange: {
                return action.isIngredientOrStep ? onChangeComplexField({fields, action}) : getNewContextState({fields, action});
            }
            case AddRecipeContextType.OnSubmit: {
                formSave.current.onSubmit(fields);
                return fields;
            }
            case AddRecipeContextType.OnAdd: {
                const {elements, elementsValidity} = addComplexElemet({fields,action});
                return getNewContextState({fields, action, elements, elementsValidity});
            }
            case AddRecipeContextType.OnDelete: {
                const {elements, elementsValidity} = removeComplexElement({fields,action});
                return getNewContextState({fields, action, elements, elementsValidity});
            }
            case AddRecipeContextType.OnRecipeLoaded: {
                return fields;
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    formSave.current.onSubmit = function (fields: any) {
        for (const field in fields.formValidity) {
            if (!fields.formValidity[field]) {
                alerts.showErrorAlert(t('p.incorrectFields'));
                return false;
            }
        }
        fields.formValue = prepareToSend(fields);
        saveImageFile({ ...fields.formValue });
    }

    function saveImageFile(formValue: any) {
        saveRecipeRequestManager.nextAndLock(() => {
            if (formValue.imageFile) {
                filesApi.saveFile(formValue.imageFile, response => onFileSaved(formValue, response), formSave.current.onError)
            } else {
                saveOrEditRecipe(formValue);
            }
        })
    }

    function onFileSaved(formValue: any, response: any) {
        formValue.image = response.value;
        saveOrEditRecipe(formValue);
    }

    function saveOrEditRecipe(formValue: any) {
        if (editedRecipe) {
            recipesApi.putRecipe(editedRecipe.id, formValue, formSave.current.onSuccess, formSave.current.onError);
        } else {
            recipesApi.postRecipe(formValue, formSave.current.onSuccess, formSave.current.onError);
        }
    }

    formSave.current.onSuccess = function (response: any) {
        saveRecipeRequestManager.unlock();
        nav.toRecipe(response.value.id);
        alerts.showSuccessAlert(t(editedRecipe ? 'p.recipeEditCorrect' : 'p.recipeAddCorrect'));
    }

    formSave.current.onError = function (response: any) {
        saveRecipeRequestManager.unlock();
        alerts.showErrorAlert(t(response.message));
    }

    return (
        <AddRecipeContext.Provider value={{ fields, editedRecipe }}>
            <AddRecipeDispatchContext.Provider value={dispatch}>
                {children}
            </AddRecipeDispatchContext.Provider>
        </AddRecipeContext.Provider>
    );
}

export default AddRecipeContextProvider;