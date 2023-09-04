import { useReducer, useRef, useImperativeHandle, forwardRef } from "react";

import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FormSave, MyForm } from "../../../../../data/utilTypes";
import MyInput from "../../../../../components/basicUi/MyInput";
import { checkIfAllValid, checkInputValidity, getEmptyForm, inputAttributes, getNewState, preventFurtherAction } from "../../../../../utils/FormInputUtils";
import MyTextarea from "../../../../../components/basicUi/MyTextarea";


function ShareRecipeForm({ formSave }: { formSave: FormSave }, ref: any) {
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
            console.log('valid')
        } else {
            console.log('invalid')
        }
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    };

    return (
        <Form noValidate validated={true} className="mt-3 text-start" ref={form}>
            {renderFilterNameInput()}
            {renderCommentInput()}
        </Form>
    )

    function renderFilterNameInput() {
        return (
            <MyInput
                {...inputAttributes("receiverUser", myForm, dispatchForm)}
                placeholder={t('p.chooseUser')}
                label={t('p.chooseUser')}
                required
            />
        )
    }

    function renderCommentInput() {
        return (
            <MyTextarea
                {...inputAttributes("comment", myForm, dispatchForm)}
                label={t('p.addComment')}
                placeholder={t('p.addComment')}
                rows={5}
            />)
    }
}

export default forwardRef(ShareRecipeForm);