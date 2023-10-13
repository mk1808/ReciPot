export function addUniqueValue(values: any[], value: any): any {
    if (!checkListContains(values, value)) {
        return [...values, value];
    }
}

export function removeValue(values: any[], value: any): any {
    const valuesCopy = [...values];
    const valueIndex = getValueIndex(valuesCopy, value);
    if (valueIndex >= 0) {
        valuesCopy.splice(valueIndex, 1);
    }
    return valuesCopy;
}

export function checkListContains(list: any[], checkedValue: any) {
    return getValueIndex(list, checkedValue) >= 0;
}

export function getValueIndex(list: any[], checkedValue: any) {
    return list.map(value => value.label || value).indexOf(checkedValue.label || checkedValue);
}

export function addObjectToList({ list, element }: { list: any[], element: any }) {
    return list !== null ? [...list, {...element}] : [{...element}];
}

export function removeByIndex({ list, index }: { list: any[], index: any }) {
    const filteredElements = list.filter((value, elementIndex) => elementIndex !== index);
    return [...filteredElements];
}