import { ReducerActionProps, fieldsStateModel } from "../pages/recipe/add/context/AddRecipeContext";
import { addObjectToList, removeByIndex } from "./ListUtils";

export function convertToObjects(list: []) {
    if (list) {
        return list.map(mapToObject)
    }
    return [];
}

function mapToObject(element: any) {
    const value = element.value;
    if (!value) {
        return element;
    }
    if (typeof value != 'object') {
        return { id: null, name: value };
    }
    return { id: value.id, name: value.name };
}

export function convertIngredientsToObjects(list: []) {
    if (!list) {
        return [];
    }
    return list.map(mapIngredientToObject);
}

function mapIngredientToObject(element: any) {
    const recipeIngredient = { ...element }
    const ingredient = recipeIngredient.ingredient;

    if (ingredient.value && typeof ingredient.value != 'object') {
        recipeIngredient.ingredient = { id: null, name: ingredient.value };
    } else {
        const prevIngredient = ingredient.value ? { ...ingredient.value } : ingredient;
        recipeIngredient.ingredient = { id: prevIngredient.id, name: prevIngredient.name };
    }
    return recipeIngredient
}

export function convertCategoriesToObjects(list: []) {
    if (list) {
        return list
            .map((element: any) => element.value ? element.value : element)
            .map((element: any) => ({ id: element.id }));
    }
    return [];
}

export function fillOrderNumbers(steps: any[]) {
    if (steps) {
        return steps.map((step: any, index: number) => ({ ...step, order: index + 1 }));
    }
    return [];
}

export function clearIds(elements: any[]) {
    if (elements) {
        return elements.map((element: any) => ({ ...element, id: typeof element.id === "number" ? null : element.id }));
    }
    return [];
}

export function convertToForm(tab: any[]) {
    return tab.map((element: any) => ({ label: element.name, value: { ...element } }));
}

export function convertRecipeIngredientsToForm(elements: any[]) {
    if (elements) {
        return elements.map(element => (
            {
                ...element,
                ingredient: {
                    label: element.ingredient.name,
                    value: element.ingredient
                }
            }));
    }
    return [];
}

export function getDefaultValue(fieldName: string, index: number, { formFields, mainFieldName }: { formFields: any, mainFieldName: any }) {
    return formFields?.formValue &&
        formFields?.formValue[mainFieldName] &&
        formFields?.formValue[mainFieldName][index] &&
        formFields?.formValue[mainFieldName][index][fieldName];
}

export function getDefaultValidityForEdit(formValidity: any) {
    return {
        ...formValidity,
        categories: true,
        difficulty: true,
        imageFile: true,
        hashTags: true,
        numberOfDishes: true,
        requiredEffort: true
    };
}

export function getFormValueForEdit(editedRecipe: any) {
    let recipeCopy = { ...editedRecipe };
    recipeCopy.hashTags = convertToForm(recipeCopy.hashTags);
    recipeCopy.categories = convertToForm(recipeCopy.categories)
    recipeCopy.recipeIngredients = convertRecipeIngredientsToForm(recipeCopy.recipeIngredients)
    return recipeCopy;
}

export function prepareToSend(recipe: any) {
    let formValue = { ...recipe.formValue };
    formValue.recipeSteps = fillOrderNumbers(formValue.recipeSteps);
    formValue.recipeSteps = clearIds(formValue.recipeSteps);
    formValue.recipeIngredients = clearIds(formValue.recipeIngredients);
    formValue.hashTags = convertToObjects(formValue.hashTags);
    formValue.categories = convertCategoriesToObjects(formValue.categories);
    formValue.recipeIngredients = convertIngredientsToObjects(formValue.recipeIngredients);
    return formValue;
}

export function onChangeComplexField({ fields, action }: { fields: fieldsStateModel, action: ReducerActionProps }) {
    if (fields.formValue[action.fieldName][action.index]) {
        fields.formValue[action.fieldName][action.index][action.subFieldName] = action.fieldValue;

        initFieldIfEmpty({ object: fields.formValidity, element: action.fieldName, defaultValue: [] });
        initFieldIfEmpty({ object: fields.formValidity[action.fieldName], element: action.index, defaultValue: {} });

        fields.formValidity[action.fieldName][action.index][action.subFieldName] = action.fieldValidity;
    }
    return deepCopyFields(fields);
}

function initFieldIfEmpty({ object, element, defaultValue }: { object: any, element: any, defaultValue: any }) {
    if (!object[element]) {
        object[element] = defaultValue;
    }
}

export function addComplexElemet({ fields, action }: { fields: fieldsStateModel, action: ReducerActionProps }) {
    const elements = addObjectToList({list: fields.formValue[action.fieldName] || [], element: action.basicObj}); 
    const elementsValidity = addObjectToList({list: fields.formValidity[action.fieldName] || [], element: action.basicObj}); 

    return { elements, elementsValidity }
}


export function removeComplexElement({ fields, action }: { fields: fieldsStateModel, action: ReducerActionProps }) {
    const elements = removeByIndex({list: fields.formValue[action.fieldName], index: action.index})
    const elementsValidity = removeByIndex({list: fields.formValidity[action.fieldName], index: action.index})
   
    return { elements, elementsValidity }
}


export function deepCopyFields(fields: fieldsStateModel) {
    return {
        ...fields,
        formValue: {
            ...fields.formValue,
        },
        formValidity: {
            ...fields.formValidity,
        },
    }
}

export function getNewContextState({ fields, action, elements, elementsValidity }:
    { fields: fieldsStateModel, action: ReducerActionProps, elements?: any, elementsValidity?: any }) {
    fields = deepCopyFields(fields);
    fields.formValue[action.fieldName] = elements ? elements : action.fieldValue;
    fields.formValidity[action.fieldName] = elementsValidity ? elementsValidity : action.fieldValidity;

    return fields;
}
