import MyModal from "./MyModal";

function CustomModal({ shouldShow, handleClose, handleSubmit, children }: { shouldShow: boolean, handleClose: () => void, handleSubmit: () => void, children?: any }) {

    return (
        <MyModal
            title="Modal heading1"
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