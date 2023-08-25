import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { useContext, useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

function MyInput({
    name = "inputName",
    label = "",
    type = "text",
    placeholder = "",
    disabled = false,

    defaultValue = "",
    required = false,
    onChange = initFcn<any>(),
    isValid,
    value

}: {
    name: string,
    label?: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    onChange?: Function,
    defaultValue?: string,
    required?: boolean,
    isValid?: boolean,
    value?: string
}) {
    const [inputValue, setInputValue] = useState(defaultValue)

    useEffect(() => { onChange(inputValue) }, [inputValue])

    function onChangeCallback(event: any) {
        setInputValue(event.target.value)
    }
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

        }
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    };

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                required={required}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChangeCallback}

                defaultValue={defaultValue}
                isValid={isValid} />
        </Form.Group>
    )
}


export default MyInput;

/*
<Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId={name}>
                {label && <Form.Label>{label}</Form.Label>}
                <Form.Control required type={type} placeholder={placeholder} disabled={disabled} onChange={onChangeCallback} />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
*/