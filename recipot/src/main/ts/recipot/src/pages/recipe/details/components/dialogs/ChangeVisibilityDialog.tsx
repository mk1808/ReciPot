import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import recipesApi from "../../../../../api/RecipesApi";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { Recipe } from "../../../../../data/types";
import useAlerts from "../../../../../hooks/useAlerts";

type Props = {
    showModal: boolean,
    onClose: () => any,
    handleSuccess: any,
    data: Recipe,
    accessType: string
};

function ChangeVisibilityDialog({
    showModal,
    onClose,
    handleSuccess,
    data,
    accessType
}: Props) {

    const ACCESS_TYPE_PREFIX = "enums.RecipeAccessType."
    const { t } = useTranslation();
    const [newType, setNewType] = useState<string>("");
    const alerts = useAlerts();

    useEffect(() => {
        setNewType(accessType === "PRIVATE" ? "PUBLIC" : "PRIVATE")
    }, [accessType])

    function onSubmit() {
        onClose();
        recipesApi.changeVisibility(data.id, onSuccess)
    }

    function onSuccess(response: any) {
        alerts.showSuccessAlert(t(response.message))
        handleSuccess(newType);
    }

    return (
        <CustomModal shouldShow={showModal} onClose={onClose} onSubmit={onSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return `${t("p.changeVisibilityQuestion")} ${t(ACCESS_TYPE_PREFIX + newType)}?`;
    }
}

export default ChangeVisibilityDialog;