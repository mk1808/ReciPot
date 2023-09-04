import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Stack } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import Info from "../../../../components/basicUi/Info";
import { useEffect, useState } from "react";
import PrivateNoteForm from "./PrivateNoteForm";
import { FormSave } from "../../../../data/utilTypes";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";

function PrivateNote() {
    const { t } = useTranslation();
    const isNotePresent = false;
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    useEffect(() => {
        setIsEditModeOn(!isNotePresent);
    }, [])
    const formSave: FormSave = getEmptyFormSave();
    formSave.onSubmit = function (formValue: any) {
        if (isEditModeOn) {
            console.log("btnz");
            console.log(formValue)
        }
        setIsEditModeOn(!isEditModeOn);
    }
    formSave.onSuccess = function () {

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
            <PrivateNoteForm formSave={formSave} isEditModeOn={isEditModeOn}></PrivateNoteForm>
        );
    }
}

export default PrivateNote;