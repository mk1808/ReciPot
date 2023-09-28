export function convertToObjects(list: []) {
    if (list) {
        return list.map((element: any) => {
            let value = element.value;
            if (!value) {
                return element;
            }
            if (typeof value != 'object') {
                return { id: null, name: value };
            }

            return { id: value.id, name: value.name };

        })
    }
    return [];

}

export function convertIngredientsToObjects(list: []) {
    if (list) {
        return list.map((recipeIngredient: any) => {
            recipeIngredient = { ...recipeIngredient }
            let ingredient = recipeIngredient.ingredient;
            if (ingredient.value && typeof ingredient.value != 'object') {
                let newIngredient = { id: null, name: ingredient.value };
                recipeIngredient.ingredient = newIngredient;
            }
            else {
                recipeIngredient.ingredient = ingredient.value || ingredient;
            }
            return recipeIngredient
        })
    }
    return [];
}

export function convertCategoriesToObjects(list: []) {
    if (list) {
        return list.map((element: any) => element.value ? element.value : element).map((element: any) => { return ({ id: element.id }) });
    }

    return [];
}

export function fillOrderNumbers(steps: any[]) {
    return !steps ? [] : steps.map((step: any, index: number) => { return { ...step, order: index + 1 } })
}

export function clearIds(elements: any[]) {
    return !elements ? [] : elements.map((element: any) => { return { ...element, id: null } })
}

export function convertToForm(tab: any) {
    return tab.map((element: any) => {
        return ({
            label: element.name, value: { ...element }
        })
    })
}

export function convertRecipeIngredientsToForm(elements: any[]) {
    return !elements ? [] : elements.map(element => { return { ...element, ingredient: { label: element.ingredient.name, value: element.ingredient } } })
}

export function getDefaultValue(fieldName: string, index: number, { formFields, mainFieldName }: { formFields: any, mainFieldName: any }) {
    return formFields?.formValue && formFields?.formValue[mainFieldName] && formFields?.formValue[mainFieldName][index] && formFields?.formValue[mainFieldName][index][fieldName];
}

export function getDefaultValidityForEdit(formValidity: any) {
    console.log({ categories: true, difficulty: true, hashTags: true, numberOfDishes: true, requiredEffort: true, ...formValidity })
    return { ...formValidity, categories: true, difficulty: true, hashTags: true, numberOfDishes: true, requiredEffort: true };
}
