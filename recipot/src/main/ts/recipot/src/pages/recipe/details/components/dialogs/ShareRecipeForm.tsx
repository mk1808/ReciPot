import CustomModal from "../../../../../components/basicUi/CustomModal";
import { useTranslation } from "react-i18next";


function ShareRecipeForm({ showModal, handleClose  }: { showModal: boolean, handleClose: any}) {
    const { t } = useTranslation();
    
    function myHandleSubmit() {
        handleClose();
        console.log("ciag dalszy")
    }
    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={myHandleSubmit}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (<></>)
    }

}

export default ShareRecipeForm;