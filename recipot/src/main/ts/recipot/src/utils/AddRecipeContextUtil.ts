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
