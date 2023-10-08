import { Modal } from "react-bootstrap";
import MyButton from "./MyButton";
import { useTranslation } from "react-i18next";

type Props = {
    title: string,
    show: boolean,
    children: any,
    onClose: () => any,
    onSubmit: () => any,
    buttonCloseText?: string,
    buttonSubmitText?: string
};

function MyModal({
    title,
    show,
    children,
    onClose,
    onSubmit,
    buttonCloseText = 'p.cancel',
    buttonSubmitText = 'p.confirm'
}: Props) {

    const { t } = useTranslation();
    return (
        <div>
            <Modal show={show} onHide={onClose}>
                {renderHeader()}
                {renderBody()}
                {renderFooter()}
            </Modal>
        </div>
    );

    function renderHeader() {
        return (
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
        )
    }
    function renderBody() {
        return (
            <Modal.Body>{children}</Modal.Body>
        )
    }
    function renderFooter() {
        return (
            <Modal.Footer>
                <MyButton.Secondary onClick={onClose}>
                    {t(buttonCloseText)}
                </MyButton.Secondary>
                <MyButton.Primary onClick={onSubmit}>
                    {t(buttonSubmitText)}
                </MyButton.Primary>
            </Modal.Footer>
        )
    }
}

export default MyModal;