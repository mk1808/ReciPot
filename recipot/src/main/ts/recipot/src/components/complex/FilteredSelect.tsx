import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from "react-i18next";

import './styles.scss';
import { renderButonSimpleText, renderButtonComplexContent, renderCheck, renderDropdownComponent, renderWrappedDropdownContent } from './FilteredSelectCommonElements';
import { SelectOption } from '../../data/utilTypes';
import { canCreateNewValue, createNewValue, stopEventPropagation } from '../../utils/FilteredSelectUtils';
import { addUniqueValue, checkListContains, removeValue } from '../../utils/ListUtils';
import { initFcn } from '../../utils/ObjectUtils';
import { renderFormGroup } from '../basicUi/CommonInputElements';

type Props<T> = {
    label: string,
    options: SelectOption<T>[],
    onSearchCallback: (phrase: string) => any,
    onSelectCallback: (value: any) => any,
    placeholder?: string,
    searchPlaceholder?: string,
    defaultValue?: SelectOption<T> | any,
    disabled?: boolean,
    allowNew?: boolean,
    multiple?: boolean,
    hierarchical?: boolean,
    required?: boolean,
    isValid?: boolean,
    highlightValidity?: boolean,
    className?: string,
    onNewValueCallback?: (value: any | any[]) => any
};

function FilteredSelect<T>({
    label,
    options,
    onSearchCallback,
    onSelectCallback,
    placeholder = "p.selectValue",
    searchPlaceholder,
    defaultValue,
    disabled = false,
    allowNew = false,
    multiple = false,
    hierarchical = false,
    required,
    isValid,
    highlightValidity = true,
    className = '',
    onNewValueCallback = initFcn()
}: Props<T>) {

    const [selectedValues, setSelectedValues] = useState<SelectOption<T>[] | any>(defaultValue || []);
    const [createdValues, setCreatedValues] = useState<any[]>([]);
    const [selected, setSelected] = useState<SelectOption<T> | undefined>(defaultValue);
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

    function onSelect(value: SelectOption<T>, event?: any) {
        stopEventPropagation(event);
        if (multiple) {
            onSelectMultiple(value);
        } else {
            setSelected(value);
        }
    }

    function onSelectMultiple(value: SelectOption<T>) {
        if (checkListContains(selectedValues, value)) {
            removeElement(value);
        } else {
            setSelectedValues(addUniqueValue(selectedValues, value));
        }
    }

    function removeElement(value: SelectOption<T>) {
        setSelectedValues(removeValue(selectedValues, value));
        setCreatedValues(removeValue(createdValues, value));
    }

    function onDropdownToggle() {
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
        const newValue = createNewValue(searchInputValue) as SelectOption<T>;
        setSelected(newValue);
        onNewValueCallback(newValue);
    }

    function clearSearch() {
        setSearchInputValue('');
        onSearchCallback('');
    }

    function onBadgeClick(value: SelectOption<T>, event?: any) {
        stopEventPropagation(event);
        removeElement(value);
    }

    function getDropdownComponentStyleClasses() {
        var styleClasses = 'form-control filtered-select-toggle d-flex align-items-center ';
        if (highlightValidity) {
            const isEmpty = multiple ? selectedValues.length === 0 : selected === undefined;
            if (!isValid || (required && isEmpty)) {
                styleClasses += " is-invalid ";
            } else {
                styleClasses += " is-valid ";
            }
        }
        return styleClasses;
    }

    function getSearchPlaceholder() {
        return searchPlaceholder || allowNew ? "p.searchOrNew" : "p.searchNotNew";
    }

    return renderFormGroup(label, label, renderDropdown, className + " filtered-select");

    function renderDropdown() {
        return renderDropdownComponent({
            buttonContent: renderButtonContent(),
            dropdownContent: renderDropdownContent(),
            className: getDropdownComponentStyleClasses(),
            onDropdownToggle: onDropdownToggle,
            disabled
        });
    }

    function renderButtonContent() {
        return multiple ?
            renderButtonComplexContent(selectedValues, t(placeholder), onBadgeClick)
            : renderButtonText();
    }

    function renderButtonText() {
        const text = selected?.label || t(placeholder);
        return renderButonSimpleText(text);
    }

    function renderDropdownContent() {
        return renderWrappedDropdownContent(t(getSearchPlaceholder()), renderOptions(options), onSearch, searchInputValue);
    }

    function renderOptions(options: SelectOption<T>[]) {
        return multiple ? renderMultiselectOptions(options) : renderSingleOptions(options);
    }

    function renderMultiselectOptions(options?: SelectOption<T>[]) {
        return options && options.map(renderMultiselectOption);
    }

    function renderMultiselectOption(option: SelectOption<T>) {
        return (
            <div
                key={option.label}
                onClick={(event) => onSelect(option, event)}
                className={hierarchical ? "ms-3 mb-2" : ""}
            >
                {renderCheck(checkListContains(selectedValues, option))}
                {option.label}
                {renderMultiselectOptions(option.children)}
            </div>
        );
    }

    function renderSingleOptions(options: SelectOption<T>[]) {
        return options?.map(option =>
            <Dropdown.Item key={option.label} onClick={() => onSelect(option)}>
                {option.label}
            </Dropdown.Item>
        )
    }
}

export default FilteredSelect;