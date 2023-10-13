import { useTranslation } from "react-i18next";
import MySelect from "../../../../components/basicUi/MySelect";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import { mapCategoriesToSearchList, onFilteredHashTagSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import { useContext, useEffect, useState } from "react";
import dictionariesApi from "../../../../api/DictionariesApi";
import { CategoryDto, Response } from "../../../../data/types";
import { AddRecipeContext, AddRecipeContextType, AddRecipeDispatchContext } from "../context/AddRecipeContext";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
import { EnumDictionaryContext, enumsStateModel } from "../../../../context/EnumDictionaryContext";

function UpperRightSide() {
    const { t } = useTranslation();
    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;
    const enumDictionaryContext = useContext(EnumDictionaryContext).enums;

    useEffect(() => {
        onFilteredHashTagSearch('', setFilteredHashTags);
        getAllCategories();
    }, [])

    function getAllCategories() {
        dictionariesApi.getAllCategories((response: Response<CategoryDto[]>) => {
            setAllCategories(response.value)
            setFilteredCategories(mapCategoriesToSearchList(response.value))
        })
    }

    function onCategorySearchCallback(phrase: string) {
        setFilteredCategories(mapCategoriesToSearchList(searchCategory(allCategories, phrase)))
    }

    function getEnum(enumName: string) {
        return enumDictionaryContext[enumName as keyof enumsStateModel] || [];
    }

    function onChange(fieldValue: any, fieldName: string) {
        if (!formFields.formValue || formFields.formValue[fieldName] !== fieldValue) {
            addRecipeDispatchContext({
                type: AddRecipeContextType.OnChange,
                fieldName,
                fieldValue,
                fieldValidity: checkInputValidity(fieldValue, fieldName)
            })
        }
    }

    function onFilteredSelectChange(value: any[], fieldName: string) {
        if (!formFields.formValue || value.length !== formFields.formValue[fieldName].length) {
            onChange(value, fieldName)
        }
    }

    function checkInputValidity(fieldValue: any, fieldName: string) {
        switch (fieldName) {
            case 'timeAmount': {
                return fieldValue != null && fieldValue >= 0;
            }
            case 'numberOfDishes':
            case 'difficulty':
            case 'requiredEffort': {
                return !!fieldValue;
            }
            case 'hashTags':
            case 'categories': {
                return !!fieldValue && fieldValue.length > 0;
            }
            default: {
                return true;
            }
        }
    }

    function getValidity(fieldName: string) {
        return formFields?.formValidity ? formFields?.formValidity[fieldName] : false;
    }

    function getAttributes(name: string, defaultValue?:any) {
        let attrs = {
            name,
            onChange,
            getValidity,
            formObject:formFields.formValue,
            type: InputAttrsType.Context
        };
        return defaultValue ? { ...attrs, defaultValue: defaultValue } : attrs;
 
    }

    return (
        <div className="text-start">
            {renderTimeAmountInput()}
            {renderAccessTypeInput()}
            {renderAmountOfDishesInput()}
            {renderDifficultyInput()}
            {renderRequiredEffortInput()}
            {renderHashTagInput()}
            {renderCategoryInput()}
        </div>
    );
    function renderTimeAmountInput() {
        return (
            <TimeAmountInput
                label={t('p.timeAmountInputLabel')}
                {...inputAttrs(getAttributes("timeAmount"))}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getEnum("accessTypes");
        return (
            <MySelect
                label={t("p.accessTypeFilter")}
                options={accessTypes}
                {...inputAttrs(getAttributes("accessType", accessTypes[0].value))}
            />
        )
    }
    function renderAmountOfDishesInput() {
        const amountOfDishes = getEnum("amountsOfDishes");
        return (
            <MySelect
                label={t("p.amountOfDishesFilter")}
                options={amountOfDishes}
                emptyOption={t('p.selectValue')}
                {...inputAttrs(getAttributes("numberOfDishes"))}
            />
        )
    }
    function renderDifficultyInput() {
        const difficulties = getEnum("difficulties");
        return (
            <MySelect
                label={t("p.difficultiesFilter")}
                options={difficulties}
                emptyOption={t('p.selectValue')}
                {...inputAttrs(getAttributes("difficulty"))}
            />
        )
    }

    function renderRequiredEffortInput() {
        const requiredEffort = getEnum("requiredEfforts");
        return (
            <MySelect
                label={t("p.requiredEffortFilter")}
                options={requiredEffort}
                emptyOption={t('p.selectValue')}
                {...inputAttrs(getAttributes("requiredEffort"))}
            />
        )
    }

    function renderHashTagInput() {
        return (
            <FilteredSelect
                multiple
                className="mb-3"
                label={t("p.hashTagFilter")}
                options={filteredHashTags}
                onSearchCallback={(phrase: string) => onFilteredHashTagSearch(phrase, setFilteredHashTags)}
                highlightValidity
                allowNew
                isValid={getValidity("hashTags")}
                onSelectCallback={(value: any) => onFilteredSelectChange(value, "hashTags")}
                defaultValue={(formFields.formValue && formFields.formValue["hashTags"])}
            />
        )
    }

    function renderCategoryInput() {
        return (
            <FilteredSelect
                multiple
                className="mb-3"
                label={t("p.categoryFilter")}
                options={filteredCategories}
                onSearchCallback={onCategorySearchCallback}
                highlightValidity
                hierarchical
                isValid={getValidity("categories")}
                onSelectCallback={(value: any) => onFilteredSelectChange(value, "categories")}
                defaultValue={(formFields.formValue && formFields.formValue["categories"])}
            />
        )
    }
}

export default UpperRightSide;