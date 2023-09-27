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
        list.forEach((recipeIngredient: any) => {
            let ingredient = recipeIngredient.ingredient;
            if (ingredient.value && typeof ingredient.value != 'object') {
                let newIngredient = { id: null, name: ingredient.value };
                recipeIngredient.ingredient = newIngredient;
            }
            else {
                recipeIngredient.ingredient = ingredient.value || ingredient;
            }

        })
    }
}

export function convertCategoriesToObjects(list: []) {
    if (list) {
        return list.map((element: any) => element.value ? element.value : element).map((element: any) => { return ({ id: element.id }) });
    }

    return [];
}

export function fillOrderNumbers(steps: []) {
    steps && steps.forEach((step: any, index: number) => { step.order = index + 1; })
}

export function clearIds(elements: []) {
    elements && elements.forEach((element: any) => { element.id = null; })
}