import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { useEffect, useState, useRef } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';

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
    className
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
    className?: string
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState(defaultValue)

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    useEffect(() => { onChange(inputValue) }, [inputValue])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue;
            setInputValue(defaultValue)
        }
    }, [defaultValue])

    function onChangeCallback(event: any) {
        setInputValue(event.target.value)
    }

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
                ref={inputRef}
                min={type == "number" ? 0 : undefined}
                className={className}
            />
        </Form.Group>
    )
}


export default MyInput;