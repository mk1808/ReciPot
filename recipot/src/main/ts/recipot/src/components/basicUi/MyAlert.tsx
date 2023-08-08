import { useEffect, useState } from "react";
import { Alert, Fade } from "react-bootstrap";

function PrimaryAlert(props: any) {
    return <MyAlert variant="primary" show={props.show}>{props.children}</MyAlert>
}

function SuccessAlert(props: any) {
    return <MyAlert variant="success" show={props.show}>{props.children}</MyAlert>
}

function ErrorAlert(props: any) {
    return <MyAlert variant="danger" show={props.show}>{props.children}</MyAlert>
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
                <Alert className="my-alert"
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