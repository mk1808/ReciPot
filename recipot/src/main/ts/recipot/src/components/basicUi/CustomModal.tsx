import { useTranslation } from "react-i18next";
import MyModal from "./MyModal";

type Props = {
    onClose: () => any,
    onSubmit: () => any,
    shouldShow: boolean,
    children?: any,
    title?: string
};

function CustomModal({
    onClose,
    onSubmit,
    shouldShow,
    children,
    title = "p.confirmation"
}: Props) {

    const { t } = useTranslation();

    return (
        <MyModal
            title={t(title)}
            onClose={onClose}
            onSubmit={onSubmit}
            show={shouldShow}
            buttonCloseText='p.cancel'
            buttonSubmitText='p.confirm'
        >
            {children}
        </MyModal>
    );
}

export default CustomModal;