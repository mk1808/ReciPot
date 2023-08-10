import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';
import { useState } from 'react';

function MySwitch({ name = "inputName", label = "", disabled = false, defaultChecked = true, onChange = initFcn<any>() }: any) {
    const [isChecked, setChecked] = useState(defaultChecked)

    function onChangeCallback(event: any) {
        onChange(!isChecked)
        setChecked(!isChecked)
    }

    return (
        <Form.Check
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