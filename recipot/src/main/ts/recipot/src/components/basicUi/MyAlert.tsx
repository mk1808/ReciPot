import { Alert } from "react-bootstrap";

function PrimaryAlert() {
    return <MyAlert variant="primary"></MyAlert>
}

function SuccessAlert() {
    return <MyAlert variant="success"></MyAlert>
}

function ErrorAlert() {
    return <MyAlert variant="danger"></MyAlert>
}

function MyAlert({ variant }: any) {
    return (
        <>
            <Alert variant={variant}>
                This is a primary alert—check it out!
            </Alert>
        </>
    );
}

MyAlert.Primary = PrimaryAlert;
MyAlert.Success = SuccessAlert;
MyAlert.Error = ErrorAlert;
export default MyAlert;