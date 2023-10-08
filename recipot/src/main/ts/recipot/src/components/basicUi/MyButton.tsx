import { Button } from "react-bootstrap";

type Props = {
    children: any,
    variant: string,
    onClick?: () => any,
    className?: string,
    disabled?: boolean,
    type?: "button" | "submit" | "reset" | undefined
};

function PrimaryButton(props: any) {
    return <MyButton variant="primary" {...props} />
}

function SecondaryButton(props: any) {
    return <MyButton variant="secondary" {...props} />
}

function OutlinePrimaryButton(props: any) {
    return <MyButton variant="outline-primary" {...props} />
}

function OutlineDangerButton(props: any) {
    return <MyButton variant="outline-danger" {...props} />
}

function MyButton({
    variant,
    children,
    onClick = () => { },
    className = "",
    disabled = false,
    type = "button"
}: Props) {

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
MyButton.OutlinePrimary = OutlinePrimaryButton;
MyButton.OutlineDanger = OutlineDangerButton;

export default MyButton;