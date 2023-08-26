import { FaPlus } from "react-icons/fa6";
import { Stack } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import MyInput from "../../../../components/basicUi/MyInput";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import ConfirmCancelButtons from "../../../../components/basicUi/ConfirmCancelButtons";

function NewCollectionForm() {
    const { t } = useTranslation();
    const [isAddNewMode, setAddNewMode] = useState(false);

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
            <div className="mt-3 text-start">
                <MyInput name="newCollectionName" placeholder="Wprowadź nazwę nowej kolekcji" label='Wprowadź nazwę nowej kolekcji' onChange={(value: string) => console.log(value)} />
                <ConfirmCancelButtons handleCancel={onCancelAddMode} handleConfirm={onSave} className="justify-content-center" />
            </div>
        )
    }
}

export default NewCollectionForm;