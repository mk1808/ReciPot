import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../../data/types";
import recipesApi from "../../../../../api/RecipesApi";
import { useNavigate } from "react-router-dom";
import useAlerts from "../../../../../hooks/useAlerts";


function DeleteRecipeDialog({ showModal, handleClose, data }: { showModal: boolean, handleClose: any, data: Recipe }) {
    const { t } = useTranslation();
    const alerts = useAlerts();  
    const navigate = useNavigate();
    function myHandleSubmit() {
        handleClose();
        recipesApi.deleteRecipe(data.id, onSuccess)
    }
    function onSuccess(response: any) {
        navigate('/user');
        setTimeout(() =>  alerts.showSuccessAlert(t(response.message)), 1000)
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