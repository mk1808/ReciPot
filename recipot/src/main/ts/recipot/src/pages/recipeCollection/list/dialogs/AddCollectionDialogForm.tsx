import { FaPlus } from "react-icons/fa6";
import { Stack, Form } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import MyInput from "../../../../components/basicUi/MyInput";
import { useTranslation } from 'react-i18next';
import { forwardRef, useImperativeHandle, useReducer, useRef, useState } from "react";
import ConfirmCancelButtons from "../../../../components/basicUi/ConfirmCancelButtons";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import AddCollectionDialog from "../dialogs/AddCollectionDialog";

function AddCollectionDialogForm({ formSave }: { formSave: FormSave }, ref: any) {
    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, getEmptyForm());
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