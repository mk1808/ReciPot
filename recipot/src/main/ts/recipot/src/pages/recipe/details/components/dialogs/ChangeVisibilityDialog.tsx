import { useState } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import { Recipe, RecipeAccessType } from "../../../../../data/types";


function ChangeVisibilityDialog({ showModal, handleClose, data }: { showModal: boolean, handleClose: any, data: Recipe }) {
    const { t } = useTranslation();
    const ACCESS_TYPE_PREFIX = "enums.RecipeAccessType."
    function myHandleSubmit() {
        handleClose();
        console.log("ciag dalszy")
    }
    function getQuestionText() {
        let type = data.accessType === "PRIVATE" ? "PUBLIC" : "PRIVATE";
        return `${t("p.changeVisibilityQuestion")} ${t(ACCESS_TYPE_PREFIX + type)}?`
    }
    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (<>{getQuestionText()}</>)
    }

}

export default ChangeVisibilityDialog;