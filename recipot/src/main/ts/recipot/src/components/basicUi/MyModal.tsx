import { Modal } from "react-bootstrap";
import MyButton from "./MyButton";
import { useTranslation } from "react-i18next";

function MyModal({
    title,
    show,
    handleClose,
    handleSubmit,
    buttonCloseText = 'p.cancel',
    buttonSubmitText = 'p.confirm',
    children }: {
        title: string,
        show: boolean,
        handleClose: () => void,
        handleSubmit: () => void,
        buttonCloseText?: string,
        buttonSubmitText?: string,
        children: any
    }) {

    const { t } = useTranslation();
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
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
                <MyButton.Secondary onClick={handleClose}>
                    {t(buttonCloseText)}
                </MyButton.Secondary>
                <MyButton.Primary onClick={handleSubmit}>
                    {t(buttonSubmitText)}
                </MyButton.Primary>
            </Modal.Footer>
        )
    }
}

export default MyModal;