import { FaPlus } from "react-icons/fa6";
import { Stack, Form } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import MyInput from "../../../../components/basicUi/MyInput";
import { useTranslation } from 'react-i18next';
import { useReducer, useState } from "react";
import ConfirmCancelButtons from "../../../../components/basicUi/ConfirmCancelButtons";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";

function NewCollectionForm({ formSave }: { formSave: FormSave }) {
    const { t } = useTranslation();
    const [isAddNewMode, setAddNewMode] = useState(false);
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, getEmptyForm());

    function handleSubmit(event: any) {
        const form = myForm;
        console.log(form)

        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue);
            console.log('valid')
        } else {
            console.log('invalid')
        }
        preventFurtherAction(event);
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    }

    function onAddMode() {
        setAddNewMode(true);
    }

    function onCancelAddMode() {
        setAddNewMode(false);
    }

    function onSave() {
        console.log("onSave")
    }

    return (
        <Stack >
            {renderAddButton()}
            {renderForm()}
        </Stack>
    );

    function renderAddButton() {
        return !isAddNewMode && <MyButton.Primary onClick={onAddMode}><FaPlus /></MyButton.Primary>;
    }

    function renderForm() {
        return (isAddNewMode &&
            <Form noValidate validated={true} onSubmit={handleSubmit} className="mt-3 text-start">
                {renderCollectionNameInput()}
                <ConfirmCancelButtons handleCancel={onCancelAddMode} handleConfirm={onSave} submitButtonType="submit" className="justify-content-center" />
            </Form>
        )
    }

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

export default NewCollectionForm;