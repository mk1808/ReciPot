export function convertToObjects(list: []) {
    if (list) {
        list.forEach((element: any) => {
            if (element.value && typeof element.value != 'object') {
                let newObject = { id: null, value: element.value }
                element.value = newObject;
            }
        })
    }
}

export function fillOrderNumbers(steps: []) {
    steps.forEach((step: any, index: number) => { step.order = index + 1; })
}

export function clearIds(elements: []) {
    elements.forEach((element: any) => { element.id = null; })
}