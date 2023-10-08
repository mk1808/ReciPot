import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../../data/types";
import recipesApi from "../../../../../api/RecipesApi";
import useAlerts from "../../../../../hooks/useAlerts";
import useMyNav from "../../../../../hooks/useMyNav";

type Props = {
    showModal: boolean,
    onClose: () => any,
    data: Recipe
};

function DeleteRecipeDialog({
    showModal,
    onClose,
    data
}: Props) {

    const { t } = useTranslation();
    const alerts = useAlerts();
    const nav = useMyNav();
    function myHandleSubmit() {
        onClose();
        recipesApi.deleteRecipe(data.id, onSuccess)
    }
    function onSuccess(response: any) {
        nav.toUser();
        setTimeout(() => alerts.showSuccessAlert(t(response.message)), 1000)
    }
    return (
        <CustomModal shouldShow={showModal} onClose={onClose} onSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        const question = `${t("p.deleteRecipeQuestion")} ${data.name}?`
        return (<>{question}</>)
    }

}

export default DeleteRecipeDialog;