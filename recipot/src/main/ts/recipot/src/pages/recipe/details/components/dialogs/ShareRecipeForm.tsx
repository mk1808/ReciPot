import { useReducer, useRef, useImperativeHandle, forwardRef } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MyInput from "../../../../../components/basicUi/MyInput";
import MyTextarea from "../../../../../components/basicUi/MyTextarea";
import { SharedRecipe } from "../../../../../data/types";
import { FormAction, FormSave, MyForm } from "../../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewFormState, inputAttrs } from "../../../../../utils/FormInputUtils";

type Props = {
    formSave: FormSave<SharedRecipe>
};

function ShareRecipeForm({
    formSave
}: Props,
    ref: any) {

    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());
    const form = useRef<any>();

    useImperativeHandle(ref, () => ({
        submitForm() {
            handleSubmit();
        }
    }));

    function formReducer(state: any, action: FormAction) {
        return getNewFormState(state, action, checkInputValidity);
    };

    function handleSubmit() {
        const submitFormEvent = { currentTarget: form.current }

        if (checkIfAllValid(submitFormEvent, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
    };

    return (
        <Form noValidate validated className="mt-3 text-start" ref={form}>
            {renderFilterNameInput()}
            {renderCommentInput()}
        </Form>
    )

    function renderFilterNameInput() {
        return (
            <MyInput
                {...inputAttrs({ name: "receiverUser", myForm, dispatchForm })}
                placeholder={t('p.chooseUser')}
                label={t('p.chooseUser')}
                required
            />
        )
    }

    function renderCommentInput() {
        return (
            <MyTextarea
                {...inputAttrs({ name: "comment", myForm, dispatchForm })}
                label={t('p.addComment')}
                placeholder={t('p.addComment')}
                required
                rows={5}
            />
        )
    }
}

export default forwardRef(ShareRecipeForm);