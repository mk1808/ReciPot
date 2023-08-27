import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Stack } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import Info from "../../../../components/basicUi/Info";
import { useEffect, useState } from "react";

function PrivateNote() {
    const { t } = useTranslation();
    const isNotePresent = false;
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    useEffect(() => {
        setIsEditModeOn(!isNotePresent);
    }, [])
    function onSaveClick() {
        console.log("btnz");
        setIsEditModeOn(!isEditModeOn);
    }
    return (
        <div className="mb-5 px-5 private-note">
            {renderHeaderWithInfo()}
            {renderTextArea()}
            {renderButton()}
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
    function renderTextArea() {
        return (
            <div className="field">
                <MyTextarea
                    required={false}
                    isValid={true}
                    name="note"
                    label=""
                    placeholder={t('p.addPrivateNote')}
                    rows={5}
                    onChange={(value: string) => console.log(value)}
                    disabled={!isEditModeOn} />
            </div>
        )
    }
    function renderButton() {
        return (
            <Stack direction="horizontal" className="justify-content-end">
                <MyButton.Primary onClick={onSaveClick} className="button-400 edit-save-btn" disabled={false}>
                    {isEditModeOn && t('p.savePrivateNote')}
                    {!isEditModeOn && t('p.editPrivateNote')}
                </MyButton.Primary>
            </Stack>
        )
    }
}

export default PrivateNote;