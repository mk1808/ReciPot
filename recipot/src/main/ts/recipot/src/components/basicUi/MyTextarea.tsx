import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { useEffect, useRef, useState } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';

function MyTextarea({
    name = "inputName",
    label = "",
    placeholder = "",
    disabled = false,
    onChange = initFcn<any>(),
    rows = 3,
    defaultValue = "",
    required,
    isValid
}: {
    name: string,
    label?: string,
    placeholder: string,
    disabled?: boolean,
    onChange: Function,
    rows?: number,
    defaultValue?: string,
    required?: boolean,
    isValid?: boolean
}) {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [inputValue, setInputValue] = useState(defaultValue)

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    useEffect(() => { onChange(inputValue) }, [inputValue])

    function onChangeCallback(event: any) {
        setInputValue(event.target.value)
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control required={required} ref={inputRef} placeholder={placeholder} disabled={disabled} onChange={onChangeCallback} as="textarea" rows={rows} defaultValue={defaultValue} />
        </Form.Group>
    )
}

export default MyTextarea;