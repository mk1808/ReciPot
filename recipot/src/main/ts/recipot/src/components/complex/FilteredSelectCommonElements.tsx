
import { Stack } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';

import HashTagBadge from '../basicUi/HashTagBadge';

export function renderDropdownComponent(parameters: { buttonContent: any, dropdownContent: any, onDropdownToggle: any, disabled: boolean, className: string }) {
    return (
        <Dropdown onToggle={parameters.onDropdownToggle}>
            <Dropdown.Toggle disabled={parameters.disabled} className={parameters.className}>
                {parameters.buttonContent}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {parameters.dropdownContent}
            </Dropdown.Menu>
        </Dropdown >
    );
}

export function renderButonSimpleText(text: string) {
    return <p className='filtered-select-button-text'>{text}</p>;
}

export function renderButtonComplexContent(selectedValues: any[], placeholder: string, onBadgeClick: Function) {
    if (selectedValues?.length > 0) {
        return renderBadges(selectedValues, onBadgeClick);
    }
    return renderPlaceholder(placeholder);
}

function renderPlaceholder(placeholder: string) {
    return <p className='filtered-select-button-text'>{placeholder}</p>;
}

function renderBadges(selectedValues: any[], onBadgeClick: Function) {
    return (
        <div className='filtered-select-button-text'>
            <Stack direction="horizontal" gap={1} className='flex-wrap'>
                {selectedValues.map(value => renderBadge(value, onBadgeClick))}
            </Stack>
        </div>
    );
}

function renderBadge(value: any, onBadgeClick: Function) {
    return (
        <div
            key={value.label}
            onClick={(event) => onBadgeClick(value, event)}
        >
            <HashTagBadge text={value.label} />
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