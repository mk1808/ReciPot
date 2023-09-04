import { useState } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../../data/types";


function DeleteRecipeDialog({ showModal, handleClose, data  }: { showModal: boolean, handleClose: any, data:Recipe}) {
    const { t } = useTranslation();
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
        const question = `${t("p.deleteRecipeQuestion")} ${data.name}?`
        return (<>{question}</>)
    }

}

export default DeleteRecipeDialog;