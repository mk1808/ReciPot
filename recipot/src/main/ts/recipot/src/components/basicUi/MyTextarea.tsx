import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { renderFormGroup } from './CommonInputElements';
import { checkValidity } from '../../utils/FormInputUtils';

type Props = {
    name: string,
    onChange: (value: string) => any,
    placeholder?: string,
    label?: string,
    disabled?: boolean,
    rows?: number,
    defaultValue?: string,
    required?: boolean,
    isValid?: boolean
};

function MyTextarea({
    name,
    onChange,
    placeholder = "",
    label = "",
    disabled = false,
    rows = 3,
    defaultValue = "",
    required = false,
    isValid
}: Props) {

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState(defaultValue)

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue;
            setInputValue(defaultValue);
        }
    }, [defaultValue])

    useEffect(() => {
        onChange(inputValue);
    }, [inputValue])

    function onChangeCallback(event: any) {
        setInputValue(event.target.value);
    }

    return renderFormGroup(name, label, renderControl);

    function renderControl() {
        return <Form.Control
            required={required}
            ref={inputRef}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChangeCallback}
            as="textarea"
            rows={rows}
            defaultValue={defaultValue}
        />;
    }
}

export default MyTextarea;