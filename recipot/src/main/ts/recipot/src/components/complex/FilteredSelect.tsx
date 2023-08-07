import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useTranslation } from "react-i18next";
import '../styles.scss';

function FilteredSelect({
    label,
    placeholder = "p.selectValue",
    searchOrNew = "p.searchOrNew",
    valuesList = [],
    defaultValue,
    disabled = false,
    width = 200,
    onSearchCallback = (phrase: string) => null,
    onSelectCallback = (value: any) => null,
    onNewValueCallback = (value: string) => null
}: any) {

    const [selected, setSelected] = useState<any>(defaultValue);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const { t } = useTranslation();

    function onSearch(event: any) {
        onSearchCallback(event.target.value);
        setSearchInputValue(event.target.value);
    }

    function onSelect(value: any) {
        setSelected(value);
        onSelectCallback(value);
    }

    function onDropdownToggle(nextShow: boolean) {
        if (valuesList.length === 0 && searchInputValue) {
            setSelected({ value: searchInputValue, label: searchInputValue })
            onNewValueCallback(searchInputValue)
        }
        setSearchInputValue('');
        onSearchCallback('');
    }

    return (
        <Form.Group>
            {renderLabel()}
            {renderDropdown()}
        </Form.Group>
    );

    function renderLabel() {
        return label && <Form.Label>{label}</Form.Label>
    }

    function renderDropdown() {
        return (
            <Dropdown onToggle={onDropdownToggle}>
                <Dropdown.Toggle disabled={disabled} className='filtered-select-toggle'>
                    {renderButtonText()}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: width }}>
                    {renderDropdownContent()}
                </Dropdown.Menu>
            </Dropdown >
        )
    }

    function renderButtonText() {
        return <p style={{ minWidth: width }} className='filtered-select-button-text'>{selected?.label || t(placeholder)}</p>;
    }

    function renderDropdownContent() {
        return <div className='p-1'>
            <Form.Control type="string" placeholder={t(searchOrNew)} onChange={onSearch} value={searchInputValue} />
            <div className='mt-1 filtered-select-list'>
                {renderValues()}
            </div>
        </div>
    }

    function renderValues() {
        return (valuesList as { value: any, label: string }[]).map(value =>
            <Dropdown.Item key={value.label} onClick={() => onSelect(value)}>{value.label}</Dropdown.Item>
        )
    }
}

export default FilteredSelect;