import { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';

import { renderFormGroup } from './CommonInputElements';
import { checkValidity } from '../../utils/FormInputUtils';

type Props = {
    name: string,
    label: string,
    onChange: (file: any) => any,
    placeholder?: string,
    disabled?: boolean,
    defaultValue?: string,
    required?: boolean,
    isValid?: boolean,
    className?: string
};

function MyFileInput({
    name,
    label,
    onChange,
    placeholder,
    disabled = false,
    defaultValue = "",
    required,
    isValid,
    className = ""
}: Props) {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        checkValidity(inputRef.current, isValid);
    }, [isValid])

    function onChangeCallback(event: any) {
        const file = event.target.files?.length > 0 ? event.target.files[0] : null;
        onChange(file);
    }

    return renderFormGroup(name, label, renderControl, "mb-3 " + className);

    function renderControl() {
        return <Form.Control
            required={required}
            ref={inputRef}
            type="file"
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChangeCallback}
            defaultValue={defaultValue}
        />
    }
}


export default MyFileInput;