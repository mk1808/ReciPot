import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

function PrimaryAlert({ children }: any) {
    return <MyAlert variant="primary">{children}</MyAlert>
}

function SuccessAlert({ children }: any) {
    return <MyAlert variant="success">{children}</MyAlert>
}

function ErrorAlert({ children }: any) {
    return <MyAlert variant="danger">{children}</MyAlert>
}

function MyAlert({ variant, children }: { variant?: string, children: any }) {
    const [show, setShow] = useState(true);

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