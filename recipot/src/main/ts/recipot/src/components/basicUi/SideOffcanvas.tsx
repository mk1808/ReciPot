import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaArrowLeftLong } from 'react-icons/fa6';
import './styles.scss';

function SideOffcanvas({ title = "", children }: { title: string, children: any }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="side-offcanvas-button">
                <FaArrowLeftLong />
            </Button>

            <Offcanvas
                show={show}
                onHide={handleClose}
                scroll={true}
                backdrop={false}
                placement="end"
                className="side-offcanvas-panel"
            >

                {renderContent()}

            </Offcanvas>
        </>
    );
    function renderContent() {
        return (
            <>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {children}
                </Offcanvas.Body>
            </>
        )
    }
}

export default SideOffcanvas;