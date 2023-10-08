import { createContext, useReducer, useRef, useContext, useEffect } from "react";
import { FormSave } from "../data/utilTypes";
import { getEmptyFormSave } from "../utils/FormInputUtils";
import { clearIds, convertToForm, convertCategoriesToObjects, convertIngredientsToObjects, convertToObjects, fillOrderNumbers, convertRecipeIngredientsToForm, getDefaultValidityForEdit } from "../utils/AddRecipeContextUtil";
import recipesApi from "../api/RecipesApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Recipe } from "../data/types";
import { ApiRequestSendManager } from "../utils/ApiRequestSendManager";
import filesApi from "../api/FilesApi";
import useAlerts from "../hooks/useAlerts";

export const AddRecipeContext = createContext<any>([]);

export const AddRecipeDispatchContext = createContext<Function>(() => { });

const saveRecipeRequestManager = ApiRequestSendManager();

function AddRecipeContextProvider({ children, editedRecipe }: { children: any, editedRecipe?: Recipe | any }) {
    const navigate = useNavigate();
    const alerts = useAlerts();
    const formSave = useRef<FormSave>(getEmptyFormSave());
    const { t } = useTranslation();
    useEffect(() => {
        if (editedRecipe) {
            let correctRecipe = { ...editedRecipe };
            correctRecipe.hashTags = convertToForm(correctRecipe.hashTags);
            correctRecipe.categories = convertToForm(correctRecipe.categories)
            correctRecipe.recipeIngredients = convertRecipeIngredientsToForm(correctRecipe.recipeIngredients)
            fields.formValidity = getDefaultValidityForEdit(fields.formValidity);
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
                alerts.showErrorAlert(t('p.incorrectFields'));
                return false;
            }
        }
        let formValue = { ...fields.formValue };
        formValue.recipeSteps = fillOrderNumbers(formValue.recipeSteps);
        formValue.recipeSteps = clearIds(formValue.recipeSteps);
        formValue.recipeIngredients = clearIds(formValue.recipeIngredients);
        formValue.hashTags = convertToObjects(formValue.hashTags);
        formValue.categories = convertCategoriesToObjects(formValue.categories);
        formValue.recipeIngredients = convertIngredientsToObjects(formValue.recipeIngredients);
        saveImageFile(formValue);
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
        formValue.image = response.value; //assumed value contains image URI
        saveOrEditRecipe(formValue);
    }

    function saveOrEditRecipe(formValue: any) {
        if (editedRecipe) {
            recipesApi.putRecipe(editedRecipe.id, formValue, formSave.current.onSuccess, formSave.current.onError)
            return;
        }

        recipesApi.postRecipe(formValue, formSave.current.onSuccess, formSave.current.onError)
    }
    formSave.current.onSuccess = function (response: any) {
        saveRecipeRequestManager.unlock();
        let id = response.value.id;
        navigate(`/recipes/${id}`)
        let alert = editedRecipe ? 'p.recipeEditCorrect' : 'p.recipeAddCorrect';
        alerts.showSuccessAlert(t(alert));
    }
    formSave.current.onError = function (response: any) {
        saveRecipeRequestManager.unlock();
        alerts.showErrorAlert(t(response.message));
    }

    function addRecipeReducer(fields: any, action: any) {
        switch (action.type) {
            case 'onChange': {
                if (action.isIngredientOrStep) {
                    if (fields.formValue[action.fieldName][action.index]) {
                        fields.formValue[action.fieldName][action.index][action.subFieldName] = action.fieldValue;
                        if (!fields.formValidity[action.fieldName]) {
                            fields.formValidity[action.fieldName] = []
                        }
                        if (!fields.formValidity[action.fieldName][action.index]) {
                            fields.formValidity[action.fieldName][action.index] = {}
                        }
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
                        ...fields.formValidity,
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
        <AddRecipeContext.Provider value={{ fields, editedRecipe }}>
            <AddRecipeDispatchContext.Provider value={dispatch}>
                {children}
            </AddRecipeDispatchContext.Provider>
        </AddRecipeContext.Provider>
    );
}

export default AddRecipeContextProvider;