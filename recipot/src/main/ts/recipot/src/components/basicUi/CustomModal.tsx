import MyModal from "./MyModal";

function CustomModal({ shouldShow, handleClose, handleSubmit }: { shouldShow: boolean, handleClose: () => void, handleSubmit: () => void }) {

    return (
        <MyModal
            title="Modal heading1"
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            show={shouldShow}
            buttonCloseText='p.cancel'
            buttonSubmitText='p.confirm'
        >
            inside of modal
        </MyModal>
    )
}

export default CustomModal;