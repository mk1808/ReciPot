export function convertToObjects(list: []) {
    list.forEach((element: any) => {
        if (element.value && typeof element.value != 'object') {
            let newObject = { id: null, value: element.value }
            element.value = newObject;
        }
    })
}