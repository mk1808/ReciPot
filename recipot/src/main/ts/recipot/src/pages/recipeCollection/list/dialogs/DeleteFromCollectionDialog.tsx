import { Recipe } from "../../../../data/types";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../../components/basicUi/CustomModal";

type Props = {
    showModal: boolean,
    onClose: any,
    handleSubmit: any,
    data: Recipe
};

function DeleteFromCollectionDialog({
    showModal,
    onClose,
    handleSubmit,
    data
}: Props) {

    const { t } = useTranslation();
    function myHandleSubmit() {
        onClose();
        handleSubmit();
    }
    return (
        <CustomModal shouldShow={showModal} onClose={onClose} onSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        const question = `${t("p.deleteRecipeFromCollectionQuestion")} ${data?.name}?`
        return (<>{question}</>)
    }
}

export default DeleteFromCollectionDialog;