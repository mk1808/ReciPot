import { BsPlusCircleFill } from "react-icons/bs";
import { Stack } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import { useState } from "react";
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
            <AddCollectionDialog showModal={showModal} handleClose={() => setShowModal(false)}/>
        </>
    }
}

export default NewCollectionForm;