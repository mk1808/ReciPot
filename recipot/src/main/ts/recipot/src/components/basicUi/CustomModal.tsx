import { useState } from "react";
import MyModal from "./MyModal";

function CustomModal({ shouldShow, handleClose, handleSubmit }: any) {

    return (
    <MyModal
        title="Modal heading1"
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        show={shouldShow}
        buttonSubmitText="submit"
        buttonCloseText="close">
        inside of modal
    </MyModal>
    )
}

export default CustomModal;