import { useTranslation } from "react-i18next";
import MySelect from "../../../../components/basicUi/MySelect";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import { getAccessTypes, getAmountOfDishes, getDifficulties, getRequiredEfforts, mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import { useContext, useEffect, useState } from "react";
import dictionariesApi from "../../../../api/DictionariesApi";
import { CategoryDto, Response } from "../../../../data/types";
import { AddRecipeContext, AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";
import { inputAttributesForContext } from "../../../../utils/FormInputUtils";
import { EnumDictionaryContext, EnumDictionaryDispatchContext } from "../../../../context/EnumDictionaryContext";

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
        return enumDictionaryContext[enumName] || [];
    }

    function onChange(fieldValue: any, fieldName: string) {
        if (!formFields.formValue || formFields.formValue[fieldName] !== fieldValue) {
            addRecipeDispatchContext({
                type: "onChange",
                fieldName,
                fieldValue,
                fieldValidity: checkInputValidity(fieldValue, fieldName)
            })
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
                {...inputAttributesForContext("timeAmount", onChange, getValidity)}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getEnum("accessTypes");
        return (
            <MySelect
                label={t("p.accessTypeFilter")}
                options={accessTypes}
                defaultValue={accessTypes[0].value}
                {...inputAttributesForContext("accessType", onChange, getValidity)}
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
                {...inputAttributesForContext("numberOfDishes", onChange, getValidity)}
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
                {...inputAttributesForContext("difficulty", onChange, getValidity)}
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
                {...inputAttributesForContext("requiredEffort", onChange, getValidity)}
            />)
    }

    function renderHashTagInput() {
        return <FilteredSelect
            multiple={true}
            className="mb-3"
            label={t("p.hashTagFilter")}
            options={filteredHashTags}
            onSearchCallback={(phrase: string) => onFilteredHashTagSearch(phrase, setFilteredHashTags)}
            highlightValidity={true}
            allowNew={true}
            isValid={getValidity("hashTag")}
            onSelectCallback={(value: string) => onChange(value, "hashTag")}
        />
    }

    function renderCategoryInput() {
        return <FilteredSelect
            multiple={true}
            className="mb-3"
            label={t("p.categoryFilter")}
            options={filteredCategories}
            onSearchCallback={onCategorySearchCallback}
            highlightValidity={true}
            hierarchical={true}
            isValid={getValidity("category")}
            onSelectCallback={(value: string) => onChange(value, "category")}
        />
    }
}

export default UpperRightSide;