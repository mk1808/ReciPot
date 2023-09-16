import Form from 'react-bootstrap/Form';
import { asHash, initFcn } from '../../utils/ObjectUtils';
import { useEffect, useRef } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';

function MySelect({
    name = "inputName",
    label = "",
    emptyOption = "",
    disabled = false,
    options = [],
    defaultValue = "",
    onChange = initFcn<any>(),
    required,
    isValid
}: {
    name: string,
    label?: string,
    emptyOption?: string,
    disabled?: boolean,
    onChange: Function,
    defaultValue?: any,
    options: any,
    required?: boolean,
    isValid?: boolean
}) {
    const inputRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    useEffect(() => {
        const newValue = getDefaultValue(defaultValue);
        if (inputRef.current && inputRef.current.value !== newValue) {
            inputRef.current.value = newValue;
            onChange(options[newValue]?.value)
        }
    }, [defaultValue, options])

    function onChangeCallback(event: any) {
        onChange(options[event.target.value]?.value)
    }

    function getDefaultValue(defaultValue: any) {
        const valueIndex = options.map((option: any) => asHash(option.value)).indexOf(asHash(defaultValue));
        if (valueIndex >= 0) {
            return String(valueIndex);
        }
        return emptyOption ? "" : "0";
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Select disabled={disabled} onChange={onChangeCallback} required={required} ref={inputRef}>
                {emptyOption && <option value="">{emptyOption}</option>}
                {options.map((optionElement: any, index: number) => <option key={index} value={index}>{optionElement.label}</option>)}
            </Form.Select>
        </Form.Group>
    )
}

export default MySelect;