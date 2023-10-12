import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import { useTranslation } from 'react-i18next';
import MySelect from "../../../../components/basicUi/MySelect";
import { CategoryDto, HashTag, Ingredient, Response } from "../../../../data/types";
import MyInput from "../../../../components/basicUi/MyInput";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import dictionariesApi from "../../../../api/DictionariesApi";
import { useContext, useEffect, useState, useMemo } from "react";
import { mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import { inputAttributesForContextWithoutValidity } from "../../../../utils/FormInputUtils";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { EnumDictionaryContext, enumsStateModel } from "../../../../context/EnumDictionaryContext";
import { UsersContext } from "../../../../context/UserContext";
import { areCategoriesDifferent, getAverageRating, matchCategories } from "../utils/RecipeFilterUtils";
import { SelectOption } from "../../../../data/utilTypes";

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
            onChange("hashTags", value)
        }
    }

    function onIngredientsChange(value: Ingredient[]) {
        if (!recipesFilterForm || value.length !== recipesFilterForm.ingredients?.length) {
            onChange("ingredients", value)
        }
    }

    function onCategoriesChange(value: SelectOption<CategoryDto>[]) {
        const matchedCategories = matchCategories(value, allCategories);
        if (areCategoriesDifferent(recipesFilterForm, matchedCategories)) {
            onChange("categories", matchedCategories)
        }
    }

    function onUserIsOwnerChange(fieldName: string, value: boolean) {
        onChange(fieldName, value);
    }

    function getEnum(enumName: string) {
        return enumDictionaryContext[enumName as keyof enumsStateModel] || [];
    }

    function onChange(fieldName: string, value: any) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.FilterFormChange,
            fieldName,
            value
        })
    }

    function getInputParams(name: string, label: string, onChangeCallback = onChange) {
        return inputAttributesForContextWithoutValidity(name, t(label), onChangeCallback, recipesFilterForm);
    }

    function getTimeAmountToDefaultValue() {
        const maxAllowedValue = 99 * 60 + 59;
        return (recipesFilterForm && recipesFilterForm["timeAmountTo"]) || maxAllowedValue;
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
                {...getInputParams("userIsOwner", t("p.userIsOwnerFilter"), onUserIsOwnerChange)}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getEnum("accessTypes");
        return isUserLogged && (
            <MySelect
                {...getInputParams("accessType", t("p.accessTypeFilter"))}
                options={accessTypes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderNameContainsInput() {
        return (
            <MyInput
                {...getInputParams("recipeName", t("p.recipeNameFilter"))}
                placeholder={t("p.recipeNameFilter")}
            />
        )
    }

    function renderTimeAmountFromInput() {
        return (
            <TimeAmountInput
                {...getInputParams("timeAmountFrom", t("p.timeAmountFromFilter"))}
            />
        )
    }

    function renderTimeAmountToInput() {
        return (
            <TimeAmountInput
                {...getInputParams("timeAmountTo", t("p.timeAmountToFilter"))}
                defaultValue={getTimeAmountToDefaultValue()}
            />
        )
    }

    function renderAmountOfDishesInput() {
        const amountOfDishes = getEnum("amountsOfDishes")
        return (
            <MySelect
                {...getInputParams("amountOfDishes", t("p.amountOfDishesFilter"))}
                options={amountOfDishes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderDifficultyInput() {
        const difficulties = getEnum("difficulties")
        return (
            <MySelect
                {...getInputParams("difficulties", t("p.difficultiesFilter"))}
                options={difficulties}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderRequiredEffortInput() {
        const requiredEffort = getEnum("requiredEfforts");
        return (
            <MySelect
                {...getInputParams("requiredEffort", t("p.requiredEffortFilter"))}
                options={requiredEffort}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderAverageRatingInput() {
        return (
            <MySelect
                {...getInputParams("averageRating", t("p.averageRatingFilter"))}
                options={averageRating}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderHashTagInput() {
        return (
            <FilteredSelect
                {...getInputParams("hashTags", t("p.hashTagFilter"))}
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
                {...getInputParams("ingredients", t("p.ingredientFilter"))}
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
                {...getInputParams("categories", t("p.categoryFilter"))}
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