import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { useEffect, useRef, useState } from 'react';
import { checkValidity } from '../../utils/FormInputUtils';

function MySwitch({
    name = "inputName",
    label = "",
    disabled = false,
    defaultChecked = true,
    onChange = initFcn<boolean>(),
    required,
    isValid
}: {
    name: string,
    label?: string,
    disabled?: boolean,
    onChange: Function,
    defaultChecked?: boolean,
    required?: boolean,
    isValid?: boolean
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isChecked, setChecked] = useState(defaultChecked)

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    function onChangeCallback(event: any) {
        onChange(!isChecked)
        setChecked(!isChecked)
    }

    return (
        <Form.Check
            required={required}
            ref={inputRef}
            type={'switch'}
            id={name}
            label={label}
            disabled={disabled}
            checked={isChecked}
            onChange={onChangeCallback}
        />
    )
}

export default MySwitch;