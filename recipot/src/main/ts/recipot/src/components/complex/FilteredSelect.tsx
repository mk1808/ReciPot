import { useEffect, useState, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useTranslation } from "react-i18next";
import './styles.scss';
import { renderButonSimpleText, renderButtonComplexContent, renderCheck, renderDropdownComponent, renderLabel, renderWrappedDropdownContent } from './FilteredSelectCommonElements';
import { addUniqueValue, checkListContains, removeValue } from '../../utils/ListUtils';
import { canCreateNewValue, createNewValue, stopEventPropagation } from '../../utils/FilteredSelectUtils';
import { initFcn } from '../../utils/ObjectUtils';

function FilteredSelect({
    label,
    placeholder = "p.selectValue",
    searchPlaceholder,
    options,
    defaultValue,
    disabled = false,
    width = 200,
    allowNew = false,
    multiple = false,
    hierarchical = false,
    required,
    isValid,
    highlightValidity = true,
    className = '',
    onSearchCallback,
    onSelectCallback,
    onNewValueCallback = initFcn()
}: {
    label: string,
    placeholder?: string,
    searchPlaceholder?: string,
    options: { value: any, label: string, children: any[] }[],
    defaultValue?: any,
    disabled?: boolean,
    width?: number,
    allowNew?: boolean,
    multiple?: boolean,
    hierarchical?: boolean,
    required?: boolean,
    isValid?: boolean,
    highlightValidity?: boolean,
    className?: string,
    onSearchCallback: (phrase: string) => any,
    onSelectCallback: (value: any | any[]) => any,
    onNewValueCallback?: (value: any | any[]) => any
}) {

    const [selectedValues, setSelectedValues] = useState<any[]>(defaultValue || []);
    const [createdValues, setCreatedValues] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(defaultValue);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const { t } = useTranslation();

    useEffect(() => {
        onSelectCallback(multiple ? selectedValues : selected);
    }, [selectedValues, selected]);

    useEffect(() => {
        onNewValueCallback(createdValues);
    }, [createdValues, onNewValueCallback]);

    useEffect(() => {
        setSelectedValues(defaultValue || [])
        setSelected(defaultValue);
    }, [defaultValue])

    function onSearch(event: any) {
        onSearchCallback(event.target.value);
        setSearchInputValue(event.target.value);
    }

    function onSelect(value: any, event?: any) {
        if (multiple) {
            stopEventPropagation(event);
            onSelectMultiple(value);
        } else {
            setSelected(value);
        }
    }

    function onSelectMultiple(value: any) {
        if (checkListContains(selectedValues, value)) {
            removeElement(value);
        } else {
            setSelectedValues(addUniqueValue(selectedValues, value));
        }
    }

    function removeElement(value: any) {
        setSelectedValues(removeValue(selectedValues, value));
        setCreatedValues(removeValue(createdValues, value));
    }

    function createNewValueBySearchInput() {
        if (canCreateNewValue(allowNew, options, searchInputValue)) {
            if (multiple) {
                createForMultipleMode();
            } else {
                createForSingleMode();
            }
        }
        clearSearch();
    }

    function createForMultipleMode() {
        const newValue = createNewValue(searchInputValue);
        if (!checkListContains(selectedValues, newValue)) {
            setSelectedValues(addUniqueValue(selectedValues, newValue));
            setCreatedValues(addUniqueValue(createdValues, newValue));
        }
    }

    function createForSingleMode() {
        const newValue = createNewValue(searchInputValue);
        setSelected(newValue);
        onNewValueCallback(newValue);
    }


    function clearSearch() {
        setSearchInputValue('');
        onSearchCallback('');
    }

    function onBadgeClick(value: any, event?: any) {
        stopEventPropagation(event);
        removeElement(value);
    }

    function getDropdownComponentStyleClasses() {
        var styleClasses = 'form-control filtered-select-toggle d-flex align-items-center '
        if (highlightValidity) {
            const isEmpty = multiple ? selectedValues.length === 0 : selected === undefined;
            if (!isValid || (required && isEmpty)) {
                styleClasses += " is-invalid ";
            } else {
                styleClasses += " is-valid ";
            }
        }
        return styleClasses
    }

    function getSearchPlaceholder() {
        return searchPlaceholder || allowNew ? "p.searchOrNew" : "p.searchNotNew";
    }

    return (
        <Form.Group className={className}>
            {renderLabel(label)}
            {renderDropdown()}
        </Form.Group>
    );

    function renderDropdown() {
        return renderDropdownComponent({
            buttonContent: renderButtonContent(),
            dropdownContent: renderDropdownContent(),
            menuWidth: width,
            className: getDropdownComponentStyleClasses(),
            onDropdownToggle: createNewValueBySearchInput,
            disabled
        })
    }

    function renderButtonContent() {
        return multiple ?
            renderButtonComplexContent(selectedValues, width, t(placeholder), onBadgeClick)
            : renderButtonText();
    }

    function renderButtonText() {
        const text = selected?.label || t(placeholder);
        return renderButonSimpleText(text, width);
    }

    function renderDropdownContent() {
        return renderWrappedDropdownContent(t(getSearchPlaceholder()), renderOptions(options), onSearch, searchInputValue);
    }

    function renderOptions(valuesList: any[]) {
        return multiple ?
            renderMultiselectOptions(valuesList)
            : renderSingleOptions(valuesList);
    }

    function renderMultiselectOptions(valuesList: any[]) {
        return (valuesList as { children: any[], label: string }[]).map(value =>
            <div key={value.label} onClick={(event) => onSelect(value, event)} className={hierarchical ? "ms-3 mb-2" : ""}>
                {renderCheck(checkListContains(selectedValues, value))}{value.label}
                {value?.children && renderMultiselectOptions(value.children)}
            </div>
        )
    }

    function renderSingleOptions(valuesList: any[]) {
        return (valuesList as { label: string }[])?.map(value =>
            <Dropdown.Item key={value.label} onClick={() => onSelect(value)}>{value.label}</Dropdown.Item>
        )
    }
}

export default FilteredSelect;