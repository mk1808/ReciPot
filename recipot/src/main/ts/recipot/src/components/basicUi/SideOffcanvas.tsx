import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaArrowLeftLong } from 'react-icons/fa6';
import './styles.scss';

type Props = {
    title: string,
    children: any
};

function SideOffcanvas({
    title,
    children
}: Props) {

    const [show, setShow] = useState(false);
    const onClose = () => setShow(false);
    const onShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={onShow} className="side-offcanvas-button">
                <FaArrowLeftLong />
            </Button>

            <Offcanvas
                show={show}
                onHide={onClose}
                scroll
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