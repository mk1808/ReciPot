import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { checkValidity } from '../../utils/FormInputUtils';

type Props = {
    name: string,
    label: string | any,
    onChange: (value: boolean) => any,
    disabled?: boolean,
    defaultChecked?: boolean,
    required?: boolean,
    isValid?: boolean
};

function MyCheckbox({
    name,
    label,
    onChange,
    disabled = false,
    defaultChecked = true,
    required = false,
    isValid = true
}: Props) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [isChecked, setChecked] = useState(defaultChecked)

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.checked = defaultChecked;
            setChecked(defaultChecked)
        }
    }, [defaultChecked])

    function onChangeCallback(event: any) {
        onChange(!isChecked)
        setChecked(!isChecked)
    }

    return (
        <Form.Check
            required={required}
            ref={inputRef}
            type='checkbox'
            id={name}
            label={label}
            disabled={disabled}
            checked={isChecked}
            onChange={onChangeCallback}
        />
    );
}

export default MyCheckbox;