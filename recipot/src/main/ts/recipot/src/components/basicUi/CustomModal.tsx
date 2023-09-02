import { useTranslation } from "react-i18next";
import MyModal from "./MyModal";

function CustomModal({ shouldShow, handleClose, handleSubmit, title = "confirmation", children }:
    { shouldShow: boolean, handleClose: () => void, handleSubmit: () => void, title?: string, children?: any }) {
    const { t } = useTranslation();
    return (
        <MyModal
            title={t(title)}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            show={shouldShow}
            buttonCloseText='p.cancel'
            buttonSubmitText='p.confirm'
        >
            {children}
        </MyModal>
    )
}

export default CustomModal;