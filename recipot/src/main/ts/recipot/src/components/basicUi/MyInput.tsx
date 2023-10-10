import Form from 'react-bootstrap/Form';
import { useEffect, useState, useRef } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';
import { initFcn } from '../../utils/ObjectUtils';
import { renderFormGroup } from './CommonInputElements';

type Props = {
    name: string,
    label?: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    onChange?: (value: string) => any,
    defaultValue?: string,
    required?: boolean,
    isValid?: boolean,
    step?: number,
    className?: string
};

function MyInput({
    name,
    label = "",
    type = "text",
    placeholder = "",
    disabled = false,
    onChange = initFcn(),
    defaultValue = "",
    required = false,
    isValid,
    step,
    className
}: Props) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState(defaultValue)

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    useEffect(() => {
        onChange(inputValue)
    }, [inputValue])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue;
            setInputValue(defaultValue)
        }
    }, [defaultValue])

    function onChangeCallback(event: any) {
        setInputValue(event.target.value)
    }

    return renderFormGroup(name, label, renderControl);

    function renderControl() {
        return <Form.Control
            required={required}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChangeCallback}
            defaultValue={defaultValue}
            ref={inputRef}
            step={step}
            min={type === "number" ? 0 : undefined}
            className={className}
        />
    }
}


export default MyInput;