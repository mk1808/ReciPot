import { useContext, useEffect, useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';

import dictionariesApi from "../../../../api/DictionariesApi";
import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import MyInput from "../../../../components/basicUi/MyInput";
import MySelect from "../../../../components/basicUi/MySelect";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import { EnumDictionaryContext, enumsStateModel } from "../../../../context/EnumDictionaryContext";
import { UsersContext } from "../../../../context/UserContext";
import { CategoryDto, HashTag, Ingredient, Response } from "../../../../data/types";
import { SelectOption } from "../../../../data/utilTypes";
import { mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { areCategoriesDifferent, getAverageRating, matchCategories } from "../utils/RecipeSearchUtils";

function RecipeFilterControls() {
    const { t } = useTranslation();
    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const averageRating = useMemo(() => getAverageRating(t), []);

    const recipesFilterForm = useContext(RecipeFilterContext).recipesFilterForm;
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const user = useContext(UsersContext);
    const enumDictionaryContext = useContext(EnumDictionaryContext).enums;
    const isUserLogged = !!user;

    useEffect(() => {
        onFilteredHashTagSearch('', setFilteredHashTags);
        onFilteredIngredientSearch('', setFilteredIngredients);
        getAllCategories();
    }, [])

    function getAllCategories() {
        dictionariesApi.getAllCategories((response: Response<CategoryDto[]>) => {
            setAllCategories(response.value)
            setFilteredCategories(mapCategoriesToSearchList(response.value))
        })
    }

    function onHashTagChange(value: HashTag[]) {
        if (!recipesFilterForm || value.length !== recipesFilterForm.hashTags?.length) {
            onChange(value, "hashTags")
        }
    }

    function onIngredientsChange(value: Ingredient[]) {
        if (!recipesFilterForm || value.length !== recipesFilterForm.ingredients?.length) {
            onChange(value, "ingredients")
        }
    }

    function onCategoriesChange(value: SelectOption<CategoryDto>[]) {
        const matchedCategories = matchCategories(value, allCategories);
        if (areCategoriesDifferent(recipesFilterForm, matchedCategories)) {
            onChange(matchedCategories, "categories")
        }
    }

    function onUserIsOwnerChange(value: boolean, fieldName: string) {
        onChange((value && user?.login) || null, fieldName);
    }

    function getEnum(enumName: string) {
        return enumDictionaryContext[enumName as keyof enumsStateModel] || [];
    }

    function onChange(value: any, fieldName: string) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.FilterFormChange,
            fieldName,
            value
        })
    }

    function getTimeAmountToDefaultValue() {
        const maxAllowedValue = 99 * 60 + 59;
        return (recipesFilterForm && recipesFilterForm["timeAmountTo"]) || maxAllowedValue;
    }

    function getUserIsOwnerDefaultValue() {
        return (recipesFilterForm && recipesFilterForm["userIsOwner"]) || false;
    }

    function onFilteredHashTag(phrase: string) {
        onFilteredHashTagSearch(phrase, setFilteredHashTags);
    }

    function onFilteredIngredient(phrase: string) {
        onFilteredIngredientSearch(phrase, setFilteredIngredients);
    }

    function onFilteredCategory(phrase: string) {
        setFilteredCategories(mapCategoriesToSearchList(searchCategory(allCategories, phrase)))
    }

    function getAttributes(name: string, label: string, onOtherChange?: any, defaultValue?: any) {
        let attrs = {
            name: name,
            label: label,
            onChange: onOtherChange || onChange,
            formObject: recipesFilterForm,
            type: InputAttrsType.ContextNoValidation
        }
        return inputAttrs(defaultValue ? { ...attrs, defaultValue: defaultValue } : attrs);
    }

    return (
        <>
            {renderUserIsOwnerInput()}
            {renderAccessTypeInput()}
            {renderNameContainsInput()}
            {renderTimeAmountFromInput()}
            {renderTimeAmountToInput()}
            {renderAmountOfDishesInput()}
            {renderDifficultyInput()}
            {renderRequiredEffortInput()}
            {renderAverageRatingInput()}
            {renderHashTagInput()}
            {renderIngredientInput()}
            {renderCategoryInput()}
        </>
    );

    function renderUserIsOwnerInput() {
        return isUserLogged && (
            <MyCheckbox
                {...getAttributes("userIsOwner", t("p.userIsOwnerFilter"), onUserIsOwnerChange)}
                defaultChecked={getUserIsOwnerDefaultValue()}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getEnum("accessTypes");
        return isUserLogged && (
            <MySelect
                {...getAttributes("accessType", t("p.accessTypeFilter"))}
                options={accessTypes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderNameContainsInput() {
        return (
            <MyInput
                {...getAttributes("recipeName", t("p.recipeNameFilter"))}
                placeholder={t("p.recipeNameFilter")}
            />
        )
    }

    function renderTimeAmountFromInput() {
        return (
            <TimeAmountInput
                {...getAttributes("timeAmountFrom", t("p.timeAmountFromFilter"))}
            />
        )
    }

    function renderTimeAmountToInput() {
        return (
            <TimeAmountInput
                {...getAttributes("timeAmountTo", t("p.timeAmountToFilter"))}
                defaultValue={getTimeAmountToDefaultValue()}
            />
        )
    }

    function renderAmountOfDishesInput() {
        const amountOfDishes = getEnum("amountsOfDishes")
        return (
            <MySelect
                {...getAttributes("amountOfDishes", t("p.amountOfDishesFilter"))}
                options={amountOfDishes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderDifficultyInput() {
        const difficulties = getEnum("difficulties")
        return (
            <MySelect
                {...getAttributes("difficulties", t("p.difficultiesFilter"))}
                options={difficulties}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderRequiredEffortInput() {
        const requiredEffort = getEnum("requiredEfforts");
        return (
            <MySelect
                {...getAttributes("requiredEffort", t("p.requiredEffortFilter"))}
                options={requiredEffort}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderAverageRatingInput() {
        return (
            <MySelect
                {...getAttributes("averageRating", t("p.averageRatingFilter"))}
                options={averageRating}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderHashTagInput() {
        return (
            <FilteredSelect
                {...getAttributes("hashTags", t("p.hashTagFilter"))}
                multiple
                options={filteredHashTags}
                onSearchCallback={onFilteredHashTag}
                onSelectCallback={onHashTagChange}
                highlightValidity={false}
                className="mb-3"
            />)
    }

    function renderIngredientInput() {
        return (
            <FilteredSelect
                multiple
                {...getAttributes("ingredients", t("p.ingredientFilter"))}
                options={filteredIngredients}
                onSearchCallback={onFilteredIngredient}
                onSelectCallback={onIngredientsChange}
                highlightValidity={false}
                className="mb-3"
            />)
    }

    function renderCategoryInput() {
        return (
            <FilteredSelect
                {...getAttributes("categories", t("p.categoryFilter"))}
                multiple
                options={filteredCategories}
                onSearchCallback={onFilteredCategory}
                onSelectCallback={onCategoriesChange}
                highlightValidity={false}
                hierarchical
                className="mb-3"
            />)
    }
}

export default RecipeFilterControls;