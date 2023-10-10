import Form from 'react-bootstrap/Form';
import { asHash } from '../../utils/ObjectUtils';
import { useEffect, useRef, useState } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';
import { SelectOption } from '../../data/utilTypes'
import { renderFormGroup } from './CommonInputElements';

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

    return renderFormGroup(name, label, renderControl);

    function renderControl() {
        return (
            <Form.Select
                disabled={disabled}
                onChange={onChangeCallback}
                required={required}
                ref={inputRef}
            >
                {renderEmptyOption()}
                {renderOptions()}
            </Form.Select>
        );
    }

    function renderEmptyOption() {
        return emptyOption && <option value=""> {emptyOption} </option>;
    }

    function renderOptions() {
        return options.map(renderOption);
    }

    function renderOption(optionElement: any, index: number) {
        return <option key={optionElement.value.id || optionElement.label} value={index}> {optionElement.label} </option>;
    }

}

export default MySelect;