import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';

function MyTextarea({ name = "inputName", label = "", placeholder = "", disabled = false, onChange = initFcn<any>(), rows = 3, defaultValue = "" }:
    { name: string, label?: string, placeholder: string, disabled?: boolean, onChange: Function, rows?: number, defaultValue?: string }) {

    function onChangeCallback(event: any) {
        onChange(event.target.value)
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control placeholder={placeholder} disabled={disabled} onChange={onChangeCallback} as="textarea" rows={rows} defaultValue={defaultValue} />
        </Form.Group>
    )
}

export default MyTextarea;