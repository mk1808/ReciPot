import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';

function MyTextarea({ name = "inputName", label = "", type = "text", placeholder = "", disabled = false, onChange = initFcn<any>(), rows = 3, value = "" }: any) {

    function onChangeCallback(event: any) {
        onChange(event.target.value)
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control type={type} placeholder={placeholder} disabled={disabled} onChange={onChangeCallback} as="textarea" rows={rows} value={value} />
        </Form.Group>
    )
}

export default MyTextarea;