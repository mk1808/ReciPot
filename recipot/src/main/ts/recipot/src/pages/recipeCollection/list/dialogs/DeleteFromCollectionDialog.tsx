import { Recipe } from "../../../../data/types";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../../components/basicUi/CustomModal";

type Props = {
    showModal: boolean,
    onClose: any,
    onSubmit: any,
    data: Recipe
};

function DeleteFromCollectionDialog({
    showModal,
    onClose,
    onSubmit,
    data
}: Props) {

    const { t } = useTranslation();

    function onSubmitCallback() {
        onClose();
        onSubmit();
    }

    return (
        <CustomModal shouldShow={showModal} onClose={onClose} onSubmit={onSubmitCallback}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return `${t("p.deleteRecipeFromCollectionQuestion")} ${data?.name}?`;
    }
}

export default DeleteFromCollectionDialog;