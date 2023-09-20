import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

function PrimaryAlert({ children, onClose }: any) {
    return <MyAlert variant="primary" onClose={onClose}>{children}</MyAlert>
}

function SuccessAlert({ children, onClose }: any) {
    return <MyAlert variant="success" onClose={onClose}>{children}</MyAlert>
}

function ErrorAlert({ children, onClose }: any) {
    return <MyAlert variant="danger" onClose={onClose}>{children}</MyAlert>
}

function MyAlert({ variant, children, onClose }: { variant?: string, children: any, onClose: () => void }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!show) {
            onClose();
        }
    }, [show])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 5_000);
        return () => { clearTimeout(timeout); };
    }, []);

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