import { useState } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";


function ChangeVisibilityDialog({ showModal, handleClose  }: { showModal: boolean, handleClose: any}) {
    function myHandleSubmit() {
        handleClose();
        console.log("ciag dalszy")
    }
    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (<>content ChangeVisibilityDialog</>)
    }

}

export default ChangeVisibilityDialog;