import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';

function MyFileInput({
    name = "inputName",
    label = "",
    placeholder = "",
    disabled = false,
    onChange = initFcn<any>(),
    defaultValue = ""
}: {
    name: string,
    label: string,
    placeholder: string,
    disabled?: boolean,
    onChange: any,
    defaultValue?: string
}) {

    function onChangeCallback(event: any) {
        onChange(event.target.value)
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control type={"file"} placeholder={placeholder} disabled={disabled} onChange={onChangeCallback} defaultValue={defaultValue} />
        </Form.Group>
    )
}


export default MyFileInput;