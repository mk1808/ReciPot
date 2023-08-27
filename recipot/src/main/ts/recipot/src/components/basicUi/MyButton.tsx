import { Button } from "react-bootstrap";
import { initFcn } from '../../utils/ObjectUtils';

function PrimaryButton(props: any) {
    return <MyButton variant="primary" {...props}>{props.children}</MyButton>
}

function SecondaryButton(props: any) {
    return <MyButton variant="secondary" {...props}>{props.children}</MyButton>
}

function OutlineButton(props: any) {
    return <MyButton variant="outline-primary" {...props}>{props.children}</MyButton>
}

function MyButton({ variant, children, onClick = initFcn<any>(), className = "", disabled = false, type = "button" }:
    { variant: string, children: any, onClick: any, className?: string, disabled?: boolean, type?: "button" | "submit" | "reset" | undefined }) {
    return (
        <Button
            variant={variant}
            className={className + " m-2"}
            onClick={onClick}
            disabled={disabled}
            type={type}>
            {children}
        </Button>
    );
}
MyButton.Primary = PrimaryButton;
MyButton.Secondary = SecondaryButton;
MyButton.Outline = OutlineButton;

export default MyButton;