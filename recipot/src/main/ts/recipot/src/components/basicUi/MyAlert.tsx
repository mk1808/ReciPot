import { useEffect, useState } from "react";
import { Alert, Fade } from "react-bootstrap";

function PrimaryAlert({ children, show }: any) {
    return <MyAlert variant="primary" show={show}>{children}</MyAlert>
}

function SuccessAlert({ children, show }: any) {
    return <MyAlert variant="success" show={show}>{children}</MyAlert>
}

function ErrorAlert({ children, show }: any) {
    return <MyAlert variant="danger" show={show}>{children}</MyAlert>
}

function MyAlert({ variant, children }: any) {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 5_000);
        return () => { clearTimeout(timeout); };
    }, [show]);
    
    return (
        <>
            {show &&
                <Alert
                    variant={variant}
                    onClose={() => setShow(false)}
                    dismissible
                >
                    {children}
                </Alert>
            }
        </>
    );
}
MyAlert.Primary = PrimaryAlert;
MyAlert.Success = SuccessAlert;
MyAlert.Error = ErrorAlert;
export default MyAlert;