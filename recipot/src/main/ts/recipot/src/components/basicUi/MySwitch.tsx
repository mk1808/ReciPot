import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';

type Props = {
    name: string,
    onChange: (value: boolean) => any,
    label?: string,
    disabled?: boolean,
    defaultChecked?: boolean,
    required?: boolean,
    isValid?: boolean
};

function MySwitch({
    name,
    onChange,
    label = "",
    disabled = false,
    defaultChecked = true,
    required,
    isValid
}: Props) {

    const inputRef = useRef<HTMLInputElement>(null);

    const [isChecked, setChecked] = useState(defaultChecked)

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    function onChangeCallback() {
        onChange(!isChecked)
        setChecked(!isChecked)
    }

    return (
        <Form.Check
            required={required}
            ref={inputRef}
            type='switch'
            id={name}
            label={label}
            disabled={disabled}
            checked={isChecked}
            onChange={onChangeCallback}
        />
    )
}

export default MySwitch;