import { useState } from "react";
import { Stack } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";

import MyButton from "../../../../components/basicUi/MyButton";
import AddCollectionDialog from "../dialogs/AddCollectionDialog";

function NewCollectionForm() {
    const [showModal, setShowModal] = useState(false);

    return (
        <Stack>
            {renderAddButton()}
        </Stack>
    );

    function renderAddButton() {
        return (
            <>
                <MyButton.Primary onClick={() => setShowModal(true)}><BsPlusCircleFill /></MyButton.Primary>
                <AddCollectionDialog showModal={showModal} onClose={() => setShowModal(false)} />
            </>
        )
    }
}

export default NewCollectionForm;