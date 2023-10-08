import { useState, useEffect } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../../data/types";
import recipesApi from "../../../../../api/RecipesApi";
import useAlerts from "../../../../../hooks/useAlerts";

function ChangeVisibilityDialog({ showModal, handleClose, handleSuccess, data, accessType }: { showModal: boolean, handleClose: any, handleSuccess: any, data: Recipe, accessType: string }) {
    const { t } = useTranslation();
    const alerts = useAlerts(); 
    const ACCESS_TYPE_PREFIX = "enums.RecipeAccessType."
    const [newType, setNewType] = useState("");
    function myHandleSubmit() {
        handleClose();
        recipesApi.changeVisibility(data.id, onSuccess)
    }

    useEffect(() => {
        setNewType(accessType === "PRIVATE" ? "PUBLIC" : "PRIVATE")
    }, [accessType])

    function onSuccess(response: any) {
        alerts.showSuccessAlert(t(response.message))
        handleSuccess(newType);
    }
    function getQuestionText() {
        return `${t("p.changeVisibilityQuestion")} ${t(ACCESS_TYPE_PREFIX + newType)}?`
    }

    return (
        <CustomModal shouldShow={showModal} onClose={handleClose} onSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (<>{getQuestionText()}</>)
    }

}

export default ChangeVisibilityDialog;