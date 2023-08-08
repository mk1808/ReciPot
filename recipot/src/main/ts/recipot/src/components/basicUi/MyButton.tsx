import { Button } from "react-bootstrap";

function PrimaryButton({ children, onClick, className, disabled }: any) {
    return <MyButton variant="primary" onClick={onClick} className={className} disabled={disabled}>{children}</MyButton>
}

function SecondaryButton({ children, onClick, className, disabled }: any) {
    return <MyButton variant="secondary" onClick={onClick} className={className} disabled={disabled}>{children}</MyButton>
}

function OutlineButton({ children, onClick, className, disabled }: any) {
    return <MyButton variant="outline-primary" onClick={onClick} className={className} disabled={disabled}>{children}</MyButton>
}

function MyButton({ variant, children, onClick = () => { }, className = "", disabled = false }: any) {
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