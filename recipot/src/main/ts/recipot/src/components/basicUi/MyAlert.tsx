import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

type AlertProps = {
    children: any,
    onClose?: () => any
};

type MyAlertProps = {
    children: any,
    onClose?: () => any,
    variant?: string
};

function PrimaryAlert({
    children,
    onClose
}: AlertProps) {

    return <MyAlert variant="primary" onClose={onClose}> {children} </MyAlert>
}

function SuccessAlert({
    children,
    onClose
}: AlertProps) {

    return <MyAlert variant="success" onClose={onClose}> {children} </MyAlert>
}

function ErrorAlert({
    children,
    onClose
}: AlertProps) {

    return <MyAlert variant="danger" onClose={onClose}> {children} </MyAlert>
}

function MyAlert({
    children,
    onClose = () => { },
    variant
}: MyAlertProps) {

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

    function onAlertClose() {
        setShow(false);
    }

    if (show) {
        return (
            <Alert
                variant={variant}
                onClose={onAlertClose}
                dismissible
            >
                {children}
            </Alert>
        );
    }

    return (<></>);
}

MyAlert.Primary = PrimaryAlert;
MyAlert.Success = SuccessAlert;
MyAlert.Error = ErrorAlert;

export default MyAlert;