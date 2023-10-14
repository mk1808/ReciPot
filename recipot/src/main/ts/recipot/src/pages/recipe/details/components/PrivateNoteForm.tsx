import { useReducer, FormEvent } from "react";
import { Form, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MyButton from "../../../../components/basicUi/MyButton";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { PrivateNote } from "../../../../data/types";
import { FormAction, FormSave, MyForm } from "../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewFormState, preventFurtherAction, inputAttrs } from "../../../../utils/FormInputUtils";

type Props = {
    formSave: FormSave<PrivateNote>,
    isEditModeOn: boolean,
    note: PrivateNote,
    setIsEditModeOn: any
};

function PrivateNoteForm({
    formSave,
    isEditModeOn,
    note,
    setIsEditModeOn
}: Props) {

    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());

    function formReducer(state: any, action: FormAction) {
        return getNewFormState(state, action, checkInputValidity);
    };

    function onSubmit(event: FormEvent) {
        if (!isEditModeOn) {
            setIsEditModeOn(true);
        } else if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
        preventFurtherAction(event);
    };

    function getPrivateNoteInputAttributes() {
        const defaultValue = note != null ? note.content : "";
        return {
            ...inputAttrs({
                label: "",
                name: "content",
                myForm,
                dispatchForm
            }),
            placeholder: t('p.addPrivateNote'),
            rows: 5,
            disabled: !isEditModeOn,
            defaultValue
        }
    }

    function getButtonText() {
        return isEditModeOn ? t('p.savePrivateNote') : t('p.editPrivateNote');
    }

    return (
        <Form noValidate validated onSubmit={onSubmit}>
            {renderTextArea()}
            {renderButton()}
        </Form>
    );

    function renderTextArea() {
        return (
            <div className="field">
                <MyTextarea
                    {...getPrivateNoteInputAttributes()}
                />
            </div>
        );
    }

    function renderButton() {
        return (
            <Stack direction="horizontal" className="justify-content-end">
                <MyButton.Primary type="submit" className="button-400 edit-save-btn">
                    {getButtonText()}
                </MyButton.Primary>
            </Stack>
        );
    }
}

export default PrivateNoteForm;