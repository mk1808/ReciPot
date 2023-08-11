import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { useState } from 'react';

function MyCheckbox({ name = "inputName", label = "", disabled = false, defaultChecked = true, onChange = initFcn<boolean>() }) {
    const [isChecked, setChecked] = useState(defaultChecked)

    function onChangeCallback(event: any) {
        onChange(!isChecked)
        setChecked(!isChecked)
    }

    return (
        <Form.Check
            type={'checkbox'}
            id={name}
            label={label}
            disabled={disabled}
            checked={isChecked}
            onChange={onChangeCallback}
        />
    )
}

export default MyCheckbox;