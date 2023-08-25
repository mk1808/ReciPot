import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { InputHTMLAttributes, useEffect, useRef } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';

function MyInput({
    name = "inputName",
    label = "",
    type = "text",
    placeholder = "",
    disabled = false,
    onChange = initFcn<any>(),
    defaultValue = "",
    required,
    isValid
}: {
    name: string,
    label?: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    onChange?: Function,
    defaultValue?: string,
    required?: boolean,
    isValid?: boolean
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    function onChangeCallback(event: any) {
        onChange(event.target.value)
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control required={true} ref={inputRef} type={type} placeholder={placeholder} disabled={disabled} onChange={onChangeCallback} defaultValue={defaultValue} />
        </Form.Group>
    )
}


export default MyInput;