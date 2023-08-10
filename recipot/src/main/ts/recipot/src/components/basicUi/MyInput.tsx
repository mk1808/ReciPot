import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';

function MyInput({ name = "inputName", label = "", type = "text", placeholder = "", disabled = false, onChange = initFcn<any>(), defaultValue = "" }: any) {

    function onChangeCallback(event: any) {
        onChange(event.target.value)
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control type={type} placeholder={placeholder} disabled={disabled} onChange={onChangeCallback} defaultValue={defaultValue} />
        </Form.Group>
    )
}


export default MyInput;