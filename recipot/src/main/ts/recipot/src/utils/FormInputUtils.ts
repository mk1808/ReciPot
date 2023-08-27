import { MyForm } from "../data/utilTypes";

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

export function onFormChange(value: any, name: string, dispatchForm: any) {
    console.log(value);
    dispatchForm({ type: name, value: value });
}

export function checkIfAllValid(event: any, myForm: MyForm) {
    for (const field in myForm.formValidity) {
        if (!myForm.formValidity[field]) { return false; }
    }
    return event.currentTarget.checkValidity() === true;
};

export function getEmptyForm(): MyForm {
    return { formValue: {}, formValidity: {} };
}

export function getEmptyFormSave() {
    return {
        onSubmit: Function,
        onSuccess: Function,
        onError: Function
    };
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
    console.log(newState)
    return newState;
}

export function preventFurtherAction(event: any) {
    event.preventDefault();
    event.stopPropagation();
}

export function checkInputValidity(action: any) {
    return true;
}