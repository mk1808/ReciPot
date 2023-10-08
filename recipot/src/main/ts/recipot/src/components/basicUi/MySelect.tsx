import Form from 'react-bootstrap/Form';
import { asHash } from '../../utils/ObjectUtils';
import { useEffect, useRef, useState } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';
import { SelectOption } from '../../data/utilTypes'

type Props<T> = {
    name: string,
    options: SelectOption<T>[],
    onChange: (value: T | undefined) => any,
    label?: string,
    emptyOption?: string,
    disabled?: boolean,
    defaultValue?: T,
    required?: boolean,
    isValid?: boolean
};

function MySelect<T>({
    name,
    options,
    onChange,
    label = "",
    emptyOption = "",
    disabled = false,
    defaultValue,
    required,
    isValid
}: Props<T>) {

    const inputRef = useRef<HTMLSelectElement>(null);
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    useEffect(() => {
        onChange(selected);
    }, [selected])

    useEffect(() => {
        const newValue = getDefaultValue(defaultValue);
        if (inputRef.current && inputRef.current.value !== newValue) {
            inputRef.current.value = newValue;
            setSelected(options[Number(newValue)]?.value)
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