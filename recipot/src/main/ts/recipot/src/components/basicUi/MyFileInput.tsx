import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { useEffect, useRef } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';

function MyFileInput({
    name = "inputName",
    label = "",
    placeholder = "",
    disabled = false,
    onChange = initFcn<any>(),
    defaultValue = "",
    required,
    isValid,
    className = ""
}: {
    name: string,
    label: string,
    placeholder?: string,
    disabled?: boolean,
    onChange: any,
    defaultValue?: string,
    required?: boolean,
    isValid?: boolean,
    className?: string
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    function onChangeCallback(event: any) {
        onChange(event.target.files?.length > 0 ? event.target.files[0] : null);
    }

    return (
        <Form.Group className={"mb-3 " + className} controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                required={required}
                ref={inputRef}
                type={"file"}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChangeCallback}
                defaultValue={defaultValue}
            />
        </Form.Group>
    )
}


export default MyFileInput;