import { Button } from "react-bootstrap";

function PrimaryButton() {
    return <MyButton variant="primary"></MyButton>
}

function SecondaryButton() {
    return <MyButton variant="secondary"></MyButton>
}

function OutlineButton() {
    return <MyButton variant="outline-primary"></MyButton>
}

function MyButton({ variant }: any) {
    return (
        <Button variant={variant} className="m-2">Primary</Button>
    );
}
MyButton.Primary = PrimaryButton;
MyButton.Secondary = SecondaryButton;
MyButton.Outline = OutlineButton;

export default MyButton;