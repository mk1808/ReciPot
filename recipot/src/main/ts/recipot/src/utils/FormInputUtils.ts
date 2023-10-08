import { FormSave, MyForm } from "../data/utilTypes";
import { initAs } from "./ObjectUtils";

export function checkValidity(input?: any, isValid?: boolean) {
    if (isValid) {
        input.setCustomValidity("")
    } else {
        input.setCustomValidity("error")
    }
}

export function inputAttributes(name: string, myForm: MyForm, dispatchForm: any) {
    return {
        name: name,
        isValid: myForm.formValidity[name],
        onChange: (value: string) => onFormChange(value, name, dispatchForm)
    }
}

export function inputAttributesForContext(name: string, onChange: Function, getValidity: Function, index?: number, formObject?: any, defaultValue?: any) {
    return {
        name: name,
        isValid: getValidity(name),
        onChange: (value: string) => onChange(value, name, index),
        defaultValue: (formObject && formObject[name]) || defaultValue
    }
}

export function inputAttributesForContextWithoutValidity(name: string, label: string, onChange: Function, formObject: any, defaultValue?: any) {
    return {
        name,
        label,
        onChange: (value: string) => onChange(name, value),
        defaultValue: (formObject && formObject[name]) || defaultValue
    }
}

export function dynamicInputAttributesForContext(name: string, onChange: Function, getValidity: Function, index?: number, formObject?: any, defaultValue?: any) {
    return {
        name: name,
        isValid: getValidity(name, index),
        onChange: (value: string) => onChange(value, name, index),
        defaultValue: (formObject && formObject[name]) || defaultValue
    }
}

export function onFormChange(value: any, name: string, dispatchForm: any) {
    dispatchForm({ type: name, value: value });
}

export function checkIfAllValid(event: any, myForm: MyForm) {
    for (const field in myForm.formValidity) {
        if (!myForm.formValidity[field]) { return false; }
    }
    return event.currentTarget.checkValidity() === true;
};

export function initEmptyForm(): MyForm {
    return { formValue: {}, formValidity: {} };
}

export function initFormSave<T>() {
    return initAs<FormSave<T>>({ onSubmit: null, onSuccess: null, onError: null })
}

export function getNewState(state: any, action: any, value: any, checkInputValidity: any) {
    let newState = {
        ...state,
        formValue: {
            ...state.formValue,
            [action.type]: value
        },
        formValidity: {
            ...state.formValidity,
            [action.type]: checkInputValidity(action, state)
        },
    };
    return newState;
}

export function preventFurtherAction(event: any) {
    event.preventDefault();
    event.stopPropagation();
}

export function checkInputValidity(action: any) {
    return true;
}