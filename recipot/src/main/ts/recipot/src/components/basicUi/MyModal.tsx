import { Modal } from "react-bootstrap";
import ConfirmCancelButtons from "./ConfirmCancelButtons";

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

    return (
        <Modal show={show} onHide={onClose}>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </Modal>
    );

    function renderHeader() {
        return (
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
        );
    }

    function renderBody() {
        return (
            <Modal.Body>{children}</Modal.Body>
        );
    }

    function renderFooter() {
        return (
            <Modal.Footer>
                <ConfirmCancelButtons
                    onCancel={onClose}
                    onConfirm={onSubmit}
                    buttonCancelText={buttonCloseText}
                    buttonSubmitText={buttonSubmitText}
                />
            </Modal.Footer>
        )
    }
}

export default MyModal;