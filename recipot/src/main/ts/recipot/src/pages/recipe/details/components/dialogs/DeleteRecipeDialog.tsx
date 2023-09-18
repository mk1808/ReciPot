import { useContext, useState } from "react";
import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../../data/types";
import { AlertsDispatchContext } from "../../../../../context/AlertContext";
import recipesApi from "../../../../../api/RecipesApi";
import { showSuccessAlert } from "../../../../../utils/RestUtils";
import { useNavigate } from "react-router-dom";


function DeleteRecipeDialog({ showModal, handleClose, data }: { showModal: boolean, handleClose: any, data: Recipe }) {
    const { t } = useTranslation();
    const alertDispatch = useContext(AlertsDispatchContext);
    const navigate = useNavigate();
    function myHandleSubmit() {
        handleClose();
        recipesApi.deleteRecipe(data.id, onSuccess)
    }
    function onSuccess(response: any) {
        navigate('/user');
        setTimeout(() => showSuccessAlert(t(response.message), alertDispatch), 1000)
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