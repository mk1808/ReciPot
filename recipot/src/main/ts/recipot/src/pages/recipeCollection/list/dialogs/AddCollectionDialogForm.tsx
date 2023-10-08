import { Form } from "react-bootstrap";
import MyInput from "../../../../components/basicUi/MyInput";
import { useTranslation } from 'react-i18next';
import { forwardRef, useImperativeHandle, useReducer, useRef, useState } from "react";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import { RecipeCollection } from "../../../../data/types";

function AddCollectionDialogForm({ formSave }: { formSave: FormSave<RecipeCollection> }, ref: any) {
    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());
    const form = useRef<any>();

    useImperativeHandle(ref, () => ({
        submitForm() {
            handleSubmit();
        }
    }));

    function handleSubmit() {
        const submitFormEvent = { currentTarget: form.current }

        if (checkIfAllValid(submitFormEvent, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    };
        return (
            <Form noValidate validated={true} className="mt-3 text-start" ref={form}>
                {renderCollectionNameInput()}
           </Form>
        )
    

    function renderCollectionNameInput() {
        return (
            <MyInput
                {...inputAttributes("newCollectionName", myForm, dispatchForm)}
                placeholder={t('p.newCollectionNameInput')}
                label={t('p.newCollectionNameInput')}
                required
            />
        )
    }


}

export default forwardRef(AddCollectionDialogForm);