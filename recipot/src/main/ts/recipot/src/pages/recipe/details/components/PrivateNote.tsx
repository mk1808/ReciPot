import { useTranslation } from "react-i18next";
import { Stack } from "react-bootstrap";
import Info from "../../../../components/basicUi/Info";
import { useEffect, useState } from "react";
import PrivateNoteForm from "./PrivateNoteForm";
import privateNotesApi from "../../../../api/PrivateNotes";
import { Recipe, PrivateNote as PrivateNoteT } from "../../../../data/types";
import MyHeader from "../../../../components/basicUi/MyHeader";
import useAlerts from "../../../../hooks/useAlerts";
import { initFormSave } from "../../../../utils/FormInputUtils";

type Props = {
    recipe: Recipe,
    note: PrivateNoteT
};

function PrivateNote({
    recipe,
    note
}: Props) {

    const { t } = useTranslation();
    const alerts = useAlerts();
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    useEffect(() => {
        setIsEditModeOn(note == null);
    }, [])
    const formSave = initFormSave<PrivateNoteT>();
    formSave.onSubmit = function (formValue: any) {
        if (isEditModeOn) {
            if (formValue.content && formValue.content.trim()) {
                return saveNote(formValue);
            }
            deleteNote();
        }
    }
    formSave.onSuccess = function (response: any) {
        setIsEditModeOn(!isEditModeOn);
        if (response.message) {
            alerts.showSuccessAlert(t(response.message));
        }
        else {
            alerts.showSuccessAlert(t("p.noteSaved"));
        }
    }
    formSave.onError = function () { }
    function saveNote(formValue: any) {
        let note = { ...formValue };
        note.recipe = { id: recipe.id };
        privateNotesApi.createPrivateNote(note, formSave.onSuccess)
    }
    function deleteNote() {
        privateNotesApi.deletePrivateNote(note.id, formSave.onSuccess);
    }

    return (
        <>
            <div className="mb-5 px-5 private-note">
                {renderHeaderWithInfo()}
                {renderForm()}
            </div>
            <hr />
        </>
    )

    function renderHeaderWithInfo() {
        return (
            <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center align-items-center title'>
                <MyHeader title={t('p.privateNote')} level="4" className="mb-4" />
                <div className="title-info">
                    <Info value={t('p.privateNoteInfo')} />
                </div>
            </Stack>
        )
    }

    function renderForm() {
        return (
            <PrivateNoteForm formSave={formSave} isEditModeOn={isEditModeOn} note={note} setIsEditModeOn={setIsEditModeOn} />
        );
    }
}

export default PrivateNote;