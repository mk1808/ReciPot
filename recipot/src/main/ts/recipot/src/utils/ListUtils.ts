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
    return list.map(value => value.label).indexOf(checkedValue.label)
}