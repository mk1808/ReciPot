import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Stack } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useTranslation } from "react-i18next";
import '../styles.scss';
import HashTagBadge from '../basicUi/HashTagBadge';
import { addUniqueValue, checkListContains, removeValue } from '../../utils/ListUtils';
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";

function FilteredMultiSelect({
    label,
    placeholder = "p.selectValue",
    searchOrNew = "p.searchOrNew",
    valuesList = [],
    defaultValue = [],
    disabled = false,
    width = 300,
    onSearchCallback = (phrase: string) => null,
    onSelectCallback = (value: any[]) => null,
    onNewValueCallback = (value: string) => null
}: any) {

    const [selectedValues, setSelectedValues] = useState<any[]>(defaultValue);
    const [createdValues, setCreatedValues] = useState<any[]>([]);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const { t } = useTranslation();

    useEffect(() => {
        onSelectCallback(selectedValues);
    }, [selectedValues, onSelectCallback]);

    useEffect(() => {
        onNewValueCallback(createdValues);
    }, [createdValues, onNewValueCallback]);

    function onSearch(event: any) {
        onSearchCallback(event.target.value);
        setSearchInputValue(event.target.value);
    }

    function removeElement(value: any) {
        setSelectedValues(removeValue(selectedValues, value))
        setCreatedValues(removeValue(createdValues, value))
    }

    function onSelect(value: any, event?: any) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (checkListContains(selectedValues, value)) {
            removeElement(value);
        } else {
            setSelectedValues(addUniqueValue(selectedValues, value));
        }
    }

    function onDropdownToggle() {
        const newValue = { value: searchInputValue, label: searchInputValue }
        const searchedValueNotFound = valuesList.length === 0;
        if (searchedValueNotFound && searchInputValue && !checkListContains(selectedValues, newValue)) {
            setSelectedValues(addUniqueValue(selectedValues, newValue));
            setCreatedValues(addUniqueValue(createdValues, newValue));
            clearSearch();
        }
    }

    function clearSearch() {
        setSearchInputValue('');
        onSearchCallback('');
    }

    function onBadgeClick(value: any, event?: any) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        removeElement(value);
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
                <Dropdown.Toggle disabled={disabled} className='filtered-multiselect-toggle d-flex align-items-center'>
                    {renderButtonContent()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {renderDropdownContent()}
                </Dropdown.Menu>
            </Dropdown >
        )
    }

    function renderButtonContent() {
        if (selectedValues.length === 0) {
            return renderPlaceholder();
        }
        return renderBadges();
    }

    function renderPlaceholder() {
        return <p style={{ minWidth: width }} className='filtered-select-button-text'>{t(placeholder)}</p>
    }

    function renderBadges() {
        return <div className='filtered-select-button-text'>
            <Stack direction="horizontal" className='flex-wrap' style={{ width: width }}>
                {selectedValues.map(value => <div key={value.label} onClick={(event) => onBadgeClick(value, event)}><HashTagBadge text={value.label} /></div>)}
            </ Stack>
        </div>
    }

    function renderDropdownContent() {
        return <div className='p-1'>
            <Form.Control type="string" placeholder={t(searchOrNew)} onChange={onSearch} value={searchInputValue} />
            <div className='mt-1 filtered-multiselect-list'>
                {renderValues()}
            </div>
        </div>
    }

    function renderValues() {
        return (valuesList as { value: any, label: string }[]).map(value =>
            <div key={value.label} onClick={(event) => onSelect(value, event)}>
                {renderCheck(checkListContains(selectedValues, value))}{value.label}
            </div>
        )
    }

    function renderCheck(checked: boolean) {
        return <div className='filtered-multiselect-checkbox'>
            {checked ? <BsCheckSquareFill className='checked' /> : <BsSquare />}
        </div>;
    }
}

export default FilteredMultiSelect;