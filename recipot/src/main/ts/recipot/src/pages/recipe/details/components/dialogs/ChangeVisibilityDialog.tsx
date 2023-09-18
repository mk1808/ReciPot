import { useState, useContext, useEffect } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import { Recipe, RecipeAccessType } from "../../../../../data/types";
import { AlertsDispatchContext } from "../../../../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import recipesApi from "../../../../../api/RecipesApi";
import { showSuccessAlert } from "../../../../../utils/RestUtils";


function ChangeVisibilityDialog({ showModal, handleClose, handleSuccess, data, accessType }: { showModal: boolean, handleClose: any, handleSuccess: any, data: Recipe, accessType: string }) {
    const { t } = useTranslation();
    const ACCESS_TYPE_PREFIX = "enums.RecipeAccessType."
    const alertDispatch = useContext(AlertsDispatchContext);
    const [newType, setNewType] = useState("");
    function myHandleSubmit() {
        handleClose();
        recipesApi.changeVisibility(data.id, onSuccess)
    }

    useEffect(() => {
        setNewType(accessType === "PRIVATE" ? "PUBLIC" : "PRIVATE")
    }, [accessType])

    function onSuccess(response: any) {
        showSuccessAlert(t(response.message), alertDispatch)
        handleSuccess(newType);
    }
    function getQuestionText() {
        return `${t("p.changeVisibilityQuestion")} ${t(ACCESS_TYPE_PREFIX + newType)}?`
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