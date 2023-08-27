export interface MyForm {
    formValue: any;
    formValidity: any;
}

export interface FormSave {
    onSubmit: Function;
    onSuccess: Function;
    onError: Function;
}
