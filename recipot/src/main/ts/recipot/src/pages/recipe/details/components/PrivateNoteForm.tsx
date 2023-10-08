import { useTranslation } from "react-i18next";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { useReducer, useState } from "react";
import { checkIfAllValid, checkInputValidity, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Form, Stack } from "react-bootstrap";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import MyButton from "../../../../components/basicUi/MyButton";
import { PrivateNote } from "../../../../data/types";

function PrivateNoteForm({ formSave, isEditModeOn, note, setIsEditModeOn }: { formSave: FormSave<PrivateNote>, isEditModeOn: boolean, note: PrivateNote, setIsEditModeOn: any }) {
    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, getEmptyForm());

    function handleSubmit(event: any) {
        if (!isEditModeOn) {
            setIsEditModeOn(true);
        } else {
            if (checkIfAllValid(event, myForm)) {
                formSave.onSubmit(myForm.formValue);
            }
        }
        preventFurtherAction(event);
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    };

    return (
        <Form noValidate validated={true} onSubmit={handleSubmit}>
            {renderTextArea()}
            {renderButton()}
        </Form>
    );

    function renderTextArea() {
        return (
            <div className="field">
                <MyTextarea
                    required={false}
                    label=""
                    placeholder={t('p.addPrivateNote')}
                    rows={5}
                    disabled={!isEditModeOn}
                    defaultValue={note != null ? note.content : ""}
                    {...inputAttributes("content", myForm, dispatchForm)} />
            </div>
        )
    };

    function renderButton() {
        return (
            <Stack direction="horizontal" className="justify-content-end">
                <MyButton.Primary type="submit" className="button-400 edit-save-btn" disabled={false}>
                    {isEditModeOn && t('p.savePrivateNote')}
                    {!isEditModeOn && t('p.editPrivateNote')}
                </MyButton.Primary>
            </Stack>
        )
    };
}

export default PrivateNoteForm;