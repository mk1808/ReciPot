import { FormAction, FormSave, MyForm } from "../data/utilTypes";
import { initAs } from "./ObjectUtils";

export function checkValidity(input?: any, isValid?: boolean) {
    if (isValid) {
        input.setCustomValidity("")
    } else {
        input.setCustomValidity("error")
    }
}

export enum InputAttrsType {
    Regular = "regular",
    Context = "context",
    ContextNoValidation = "contextNoValidation",
    DynamicContext = "dynamicContext"
};

let deleteFields = {
    regular: (ob: any) => { delete ob.defaultValue; delete ob.label; return ob; },
    context: (ob: any) => { delete ob.label; return ob; },
    contextNoValidation: (ob: any) => { delete ob.isValid; return ob; },
    dynamicContext: (ob: any) => { delete ob.label; return ob; },
}

export function inputAttrs<T>(
    { 
        name, 
        myForm, 
        dispatchForm, 
        onChange, 
        getValidity, 
        index, 
        formObject, 
        defaultValue, 
        label, 
        type = InputAttrsType.Regular 
    }
        : {
            name: string,
            myForm?: MyForm,
            dispatchForm?: any,
            onChange?: (value: T, name: string, index?: number) => any,
            getValidity?: Function,
            index?: number,
            formObject?: any,
            defaultValue?: any,
            label?: string,
            type?: InputAttrsType
        }) {
    var options = [
        (value: T) => onFormChange(value, name, dispatchForm),
        (value: T) => onChange && onChange(value, name, index)
    ]
    let allAttrs = {
        name,
        label,
        isValid: myForm !== undefined ? myForm.formValidity[name] : getValidity && getValidity(name, index),
        onChange: dispatchForm !== undefined ? options[0] : options[1],
        defaultValue: (formObject && formObject[name]) || defaultValue
    }
    return deleteFields[type](allAttrs);
}

export function onFormChange(value: any, name: string, dispatchForm: any) {
    dispatchForm({ type: name, value: value });
}

export function checkIfAllValid(event: any, myForm: MyForm) {
    for (const field in myForm.formValidity) {
        if (!myForm.formValidity[field]) {
            return false;
        }
    }
    return event.currentTarget.checkValidity() === true;
};

export function initEmptyForm(): MyForm {
    return { formValue: {}, formValidity: {} };
}

export function initFormSave<T>() {
    return initAs<FormSave<T>>({ onSubmit: null, onSuccess: null, onError: null })
}

export function getNewFormState(state: any, action: FormAction, checkInputValidity: (...params: any) => {}) {
    let newState = {
        ...state,
        formValue: {
            ...state.formValue,
            [action.type]: action.value
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