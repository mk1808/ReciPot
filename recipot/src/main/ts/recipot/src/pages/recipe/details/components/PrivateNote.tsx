import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import PrivateNoteForm from "./PrivateNoteForm";
import privateNotesApi from "../../../../api/PrivateNotes";
import Info from "../../../../components/basicUi/Info";
import MyHeader from "../../../../components/basicUi/MyHeader";
import { Recipe, PrivateNote as PrivateNoteT, Response } from "../../../../data/types";
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
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    const alerts = useAlerts();
    const formSave = initFormSave<PrivateNoteT>();

    useEffect(() => {
        setIsEditModeOn(note == null);
    }, [])

    formSave.onSubmit = function (formValue: any) {
        if (isEditModeOn) {
            if (formValue.content && formValue.content.trim()) {
                return saveNote(formValue);
            }
            deleteNote();
        }
    }

    formSave.onSuccess = function (response: Response<any>) {
        setIsEditModeOn(!isEditModeOn);
        alerts.showSuccessAlert(response.message ? t(response.message) : t("p.noteSaved"));
    }

    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    function saveNote(formValue: any) {
        let note = { ...formValue, recipe: { id: recipe.id } };
        privateNotesApi.createPrivateNote(note, formSave.onSuccess, formSave.onError)
    }

    function deleteNote() {
        privateNotesApi.deletePrivateNote(note.id, formSave.onSuccess, formSave.onError);
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
            <PrivateNoteForm
                formSave={formSave}
                isEditModeOn={isEditModeOn}
                note={note}
                setIsEditModeOn={setIsEditModeOn}
            />
        );
    }
}

export default PrivateNote;