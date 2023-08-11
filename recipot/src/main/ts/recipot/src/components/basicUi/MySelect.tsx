import Form from 'react-bootstrap/Form';
import { initFcn } from '../../utils/ObjectUtils';

function MySelect({ name = "inputName", label = "", emptyOption = "", disabled = false, options = [], defaultValue = {}, onChange = initFcn<any>() }: any) {
    function onChangeCallback(event: any) {
        onChange(options[event.target.value]?.value)
    }

    function getDefaultValue() {
        return options.map((option: any) => option.value).indexOf(defaultValue)
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Select disabled={disabled} onChange={onChangeCallback} defaultValue={getDefaultValue()}>
                {emptyOption && <option value="-1">{emptyOption}</option>}
                {options.map((optionElement: any, index: number) => <option key={index} value={index}>{optionElement.label}</option>)}
            </Form.Select>
        </Form.Group>

    )
}

export default MySelect;