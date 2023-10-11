
export function stopEventPropagation(event?: any) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
}

export function createNewValue(searchInputValue: string) {
    return {
        value: searchInputValue,
        label: searchInputValue
    };
}

export function canCreateNewValue(allowNew: boolean, options: any[], searchInputValue: string) {
    const searchedValueNotFound = options.length === 0;
    return allowNew && searchedValueNotFound && searchInputValue;
}