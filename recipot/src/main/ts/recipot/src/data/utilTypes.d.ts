export interface MyForm {
    formValue: any;
    formValidity: any;
}

export interface FormSave {
    onSubmit: Function;
    onSuccess: Function;
    onError: Function;
}

export interface Enums {
    difficulties: [] | Function,
    requiredEfforts: [] | Function,
    amountsOfDishes: [] | Function,
    accessTypes: [] | Function,
}
