import { createContext, useReducer, useRef, useContext, useEffect } from "react";
import { FormSave } from "../data/utilTypes";
import { getEmptyFormSave } from "../utils/FormInputUtils";
import { clearIds, convertToForm, convertCategoriesToObjects, convertIngredientsToObjects, convertToObjects, fillOrderNumbers } from "../utils/AddRecipeContextUtil";
import recipesApi from "../api/RecipesApi";
import { useNavigate } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../utils/RestUtils";
import { useTranslation } from "react-i18next";
import { AlertsDispatchContext } from "./AlertContext";
import { Recipe } from "../data/types";

export const AddRecipeContext = createContext<any>([]);

export const AddRecipeDispatchContext = createContext<Function>(() => { });

function AddRecipeContextProvider({ children, editedRecipe }: { children: any, editedRecipe?: Recipe | any }) {
    const navigate = useNavigate();
    const formSave = useRef<FormSave>(getEmptyFormSave());
    const wasSaveSend = useRef<boolean>(false);
    const { t } = useTranslation();
    const alertDispatch = useContext(AlertsDispatchContext);
    useEffect(() => {
        if (editedRecipe) {
            let correctRecipe = { ...editedRecipe };
            correctRecipe.hashTags = convertToForm(correctRecipe.hashTags);
            correctRecipe.categories = convertToForm(correctRecipe.categories)

            //todo
            fields.formValue = correctRecipe;
        }
    }, [editedRecipe])
    const [fields, dispatch]: [any, Function] = useReducer(
        addRecipeReducer,
        []
    );
    formSave.current.onSubmit = function (fields: any) {
        for (const field in fields.formValidity) {
            if (!fields.formValidity[field]) {
                showErrorAlert(t('p.incorrectFields'), alertDispatch);
                //return false;
            }
        }
        let formValue = { ...fields.formValue };
        formValue.recipeSteps = fillOrderNumbers(formValue.recipeSteps);
        formValue.recipeSteps = clearIds(formValue.recipeSteps);
        formValue.recipeIngredients = clearIds(formValue.recipeIngredients);
        formValue.hashTags = convertToObjects(formValue.hashTags);
        formValue.categories = convertCategoriesToObjects(formValue.categories);
        formValue.recipeIngredients = convertIngredientsToObjects(formValue.recipeIngredients);
        console.log("formValue", formValue)
        return false;
        if (!wasSaveSend.current) {
            wasSaveSend.current = true;
            recipesApi.postRecipe(fields.formValue, formSave.current.onSuccess, formSave.current.onError)
        }
    }
    formSave.current.onSuccess = function (response: any) {
        wasSaveSend.current = false;
        let id = response.value.id;
        navigate(`/recipes/${id}`)
        showSuccessAlert(t('p.recipeAddCorrect'), alertDispatch);
    }
    formSave.current.onError = function (response: any) {
        wasSaveSend.current = false;
        showErrorAlert(t(response.message), alertDispatch);
    }

    function addRecipeReducer(fields: any, action: any) {
        console.log(fields)
        switch (action.type) {
            case 'onChange': {
                if (action.isIngredientOrStep) {
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
                formSave.current.onSubmit(fields);
                return fields;
            }
            case 'onAdd': {
                let elements: any;
                let elementsValidity: any


                if (fields.formValue[action.fieldName] == null) {
                    elements = [];
                } else {
                    elements = [...fields.formValue[action.fieldName]];
                }
                elements.push({ ...action.basicObj });

                if (fields.formValidity[action.fieldName] == null) {
                    elementsValidity = [];
                } else {
                    elementsValidity = [...fields.formValidity[action.fieldName]];
                }
                elementsValidity.push({ ...action.basicObj });


                return {
                    ...fields,
                    formValue: {
                        ...fields.formValue,
                        [action.fieldName]: elements
                    },
                    formValidity: {
                        ...fields.formValidity,
                        [action.fieldName]: elementsValidity
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
            case 'onRecipeLoaded': {
                console.log(action.recipe);
                return;
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
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