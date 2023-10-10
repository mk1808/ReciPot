import { Form } from "react-bootstrap";

export function renderLabel(label: string) {
    return label && <Form.Label>{label}</Form.Label>
}

export function renderFormGroup(controlId: string, label: string, renderControl: any, className: string = "mb-3") {
    return (
        <Form.Group className={className} controlId={controlId}>
            {renderLabel(label)}
            {renderControl()}
        </Form.Group>
    );
}