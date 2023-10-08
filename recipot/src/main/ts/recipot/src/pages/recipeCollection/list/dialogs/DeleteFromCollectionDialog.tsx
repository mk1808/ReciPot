import { Recipe } from "../../../../data/types";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../../components/basicUi/CustomModal";

function DeleteFromCollectionDialog({ showModal, handleClose, handleSubmit, data }: { showModal: boolean, handleClose: any, handleSubmit: any, data: Recipe }) {
    const { t } = useTranslation();
    function myHandleSubmit() {
        handleClose();
        handleSubmit();
    }
    return (
        <CustomModal shouldShow={showModal} onClose={handleClose} onSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        const question = `${t("p.deleteRecipeFromCollectionQuestion")} ${data?.name}?`
        return (<>{question}</>)
    }
}

export default DeleteFromCollectionDialog;