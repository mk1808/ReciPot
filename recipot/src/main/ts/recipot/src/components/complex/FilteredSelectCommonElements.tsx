
import { Stack } from "react-bootstrap";
import HashTagBadge from '../basicUi/HashTagBadge';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

export function renderLabel(label: string) {
    return label && <Form.Label>{label}</Form.Label>;
}

export function renderDropdownComponent(parameters: { buttonContent: any, dropdownContent: any, onDropdownToggle: any, disabled: boolean, menuWidth: number, className: string }) {
    return (
        <Dropdown onToggle={parameters.onDropdownToggle}>
            <Dropdown.Toggle disabled={parameters.disabled} className={parameters.className}>
                {parameters.buttonContent}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: parameters.menuWidth }}>
                {parameters.dropdownContent}
            </Dropdown.Menu>
        </Dropdown >
    );
}

export function renderButonSimpleText(text: string, minWidth: number) {
    return <p style={{ minWidth: minWidth }} className='filtered-select-button-text'>{text}</p>;
}

export function renderButtonComplexContent(selectedValues: any[], minWidth: number, placeholder: string, onBadgeClick: Function) {
    if (selectedValues?.length > 0) {
        return renderBadges(selectedValues, minWidth, onBadgeClick);
    }
    return renderPlaceholder(minWidth, placeholder);
}

function renderPlaceholder(minWidth: number, placeholder: string) {
    return <p style={{ minWidth: minWidth }} className='filtered-select-button-text'>{placeholder}</p>;
}

function renderBadges(selectedValues: any[], width: number, onBadgeClick: Function) {
    return (
        <div className='filtered-select-button-text'>
            <Stack direction="horizontal" className='flex-wrap' style={{ width: width }}>
                {selectedValues.map(value => <div key={value.label} onClick={(event) => onBadgeClick(value, event)}><HashTagBadge text={value.label} /></div>)}
            </Stack>
        </div>
    );
}

export function renderWrappedDropdownContent(placeholder: string, content: any, onChange: any, value: any) {
    return (
        <div className='p-1'>
            <Form.Control type="string" placeholder={placeholder} onChange={onChange} value={value} />
            <div className='mt-1 filtered-select-list'>
                {content}
            </div>
        </div>
    );
}

export function renderCheck(checked: boolean) {
    return (
        <div className='filtered-select-checkbox mx-2'>
            {checked ? <BsCheckSquareFill className='checked' /> : <BsSquare />}
        </div>
    );
}