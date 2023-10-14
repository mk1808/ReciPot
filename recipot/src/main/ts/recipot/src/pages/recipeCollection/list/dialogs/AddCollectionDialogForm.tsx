import { forwardRef, useImperativeHandle, useReducer, useRef } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

import MyInput from "../../../../components/basicUi/MyInput";
import { RecipeCollection } from "../../../../data/types";
import { FormAction, FormSave, MyForm } from "../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewFormState, inputAttrs } from "../../../../utils/FormInputUtils";

type Props = {
    formSave: FormSave<RecipeCollection>
};

function AddCollectionDialogForm({
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

    function handleSubmit() {
        const submitFormEvent = { currentTarget: form.current }

        if (checkIfAllValid(submitFormEvent, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
    };

    function formReducer(state: any, action: FormAction) {
        return getNewFormState(state, action, checkInputValidity);
    };

    return (
        <Form noValidate validated className="mt-3 text-start" ref={form}>
            {renderCollectionNameInput()}
        </Form>
    )

    function renderCollectionNameInput() {
        return (
            <MyInput
                {...inputAttrs({ name: "newCollectionName", myForm, dispatchForm })}
                placeholder={t('p.newCollectionNameInput')}
                label={t('p.newCollectionNameInput')}
                required
            />
        )
    }
}

export default forwardRef(AddCollectionDialogForm);