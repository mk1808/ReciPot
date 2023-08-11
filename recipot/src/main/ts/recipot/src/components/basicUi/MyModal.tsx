import { Modal } from "react-bootstrap";
import MyButton from "./MyButton";

function MyModal({
    title,
    show,
    handleClose,
    handleSubmit,
    buttonCloseText = "Anuluj",
    buttonSubmitText = "Zatwierdź",
    children }: any) {

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
                    {buttonCloseText}
                </MyButton.Secondary>
                <MyButton.Primary onClick={handleSubmit}>
                    {buttonSubmitText}
                </MyButton.Primary>
            </Modal.Footer>
        )
    }
}

export default MyModal;