import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
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
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{children}</Modal.Body>

                <Modal.Footer>
                    <MyButton.Secondary onClick={handleClose}>
                        {buttonCloseText}
                    </MyButton.Secondary>
                    <MyButton.Primary onClick={handleSubmit}>
                        {buttonSubmitText}
                    </MyButton.Primary>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyModal;