import { Button } from "react-bootstrap";

function PrimaryButton(props: any) {
    return <MyButton variant="primary" {...props}>{props.children}</MyButton>
}

function SecondaryButton(props: any) {
    return <MyButton variant="secondary" {...props}>{props.children}</MyButton>
}

function OutlineButton(props: any) {
    return <MyButton variant="outline-primary" {...props}>{props.children}</MyButton>
}

function MyButton({ variant, children, onClick = () => {}, className = "", disabled = false }: any) {
    return (
        <Button
            variant={variant}
            className={className + " m-2"}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </Button>
    );
}
MyButton.Primary = PrimaryButton;
MyButton.Secondary = SecondaryButton;
MyButton.Outline = OutlineButton;

export default MyButton;