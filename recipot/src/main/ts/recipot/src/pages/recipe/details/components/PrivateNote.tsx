import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Stack } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import Info from "../../../../components/basicUi/Info";
import { useContext, useEffect, useState } from "react";
import PrivateNoteForm from "./PrivateNoteForm";
import { FormSave } from "../../../../data/utilTypes";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import privateNotesApi from "../../../../api/PrivateNotes";
import { Recipe, PrivateNote as PrivateNoteT } from "../../../../data/types";
import { AlertsDispatchContext } from "../../../../context/AlertContext";
import { showSuccessAlert } from "../../../../utils/RestUtils";

function PrivateNote({ recipe, note }: { recipe: Recipe, note: PrivateNoteT }) {
    const { t } = useTranslation();
    const alertsDispatchContext = useContext(AlertsDispatchContext);
    const isNotePresent = false;
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    useEffect(() => {
        setIsEditModeOn(note == null);
    }, [])
    const formSave: FormSave = getEmptyFormSave();
    formSave.onSubmit = function (formValue: any) {
        if (isEditModeOn) {
            let note = { ...formValue };
            note.recipe = { id: recipe.id };
            privateNotesApi.createPrivateNote(note, formSave.onSuccess)
        }

    }
    formSave.onSuccess = function (response: any) {

        setIsEditModeOn(!isEditModeOn);
        showSuccessAlert(t("p.noteSaved"), alertsDispatchContext);

    }
    formSave.onError = function () {

    }
    return (
        <div className="mb-5 px-5 private-note">
            {renderHeaderWithInfo()}
            {renderForm()}
        </div>
    )
    function renderHeaderWithInfo() {
        return (
            <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center align-items-center py-3 title'>
                <h4 className="my-3 display-4">{t('p.privateNote')}</h4>
                <div className="mt-2">
                    <Info value={t('p.privateNoteInfo')} />
                </div>
            </Stack>
        )
    }

    function renderForm() {
        return (
            <PrivateNoteForm formSave={formSave} isEditModeOn={isEditModeOn} note={note} setIsEditModeOn={setIsEditModeOn}></PrivateNoteForm>
        );
    }
}

export default PrivateNote;