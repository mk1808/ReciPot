import { useReducer, useRef, useImperativeHandle, forwardRef } from "react";
import MyInput from "../../../../components/basicUi/MyInput";
import { checkIfAllValid, checkInputValidity, getEmptyForm, getEmptyFormSave, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import { Form } from "react-bootstrap";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { useTranslation } from "react-i18next";

function AddRecipeFilterForm({ formSave }: { formSave: FormSave }, ref: any) {
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
        <Form id='my-form' noValidate validated={true} className="mt-3 text-start" ref={form}>
            {renderFilterNameInput()}
        </Form>
    )

    function renderFilterNameInput() {
        return (
            <MyInput
                {...inputAttributes("newFilterName", myForm, dispatchForm)}
                placeholder={t('p.newFilterNameInput')}
                label={t('p.newFilterNameInput')}
                required
            />
        )
    }
}

export default forwardRef(AddRecipeFilterForm);