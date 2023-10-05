import { BsPlusCircleFill } from "react-icons/bs";
import { Stack, Form } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import MyInput from "../../../../components/basicUi/MyInput";
import { useTranslation } from 'react-i18next';
import { useReducer, useState } from "react";
import ConfirmCancelButtons from "../../../../components/basicUi/ConfirmCancelButtons";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import AddCollectionDialog from "../dialogs/AddCollectionDialog";

function NewCollectionForm() {
    const [showModal, setShowModal] = useState(false);

    return (
        <Stack>
            {renderAddButton()}
        </Stack>
    );

    function renderAddButton() {
        return <>
            <MyButton.Primary onClick={() => setShowModal(true)}><BsPlusCircleFill /></MyButton.Primary>
            <AddCollectionDialog showModal={showModal} handleClose={() => setShowModal(false)}></AddCollectionDialog>
        </>
    }
}

export default NewCollectionForm;