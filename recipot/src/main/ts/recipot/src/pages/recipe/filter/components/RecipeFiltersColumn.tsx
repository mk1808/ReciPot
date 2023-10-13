import { Form, Stack } from "react-bootstrap";
import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import { useTranslation } from 'react-i18next';
import MySelect from "../../../../components/basicUi/MySelect";
import { CategoryDto, HashTag, Ingredient, Response } from "../../../../data/types";
import MyInput from "../../../../components/basicUi/MyInput";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import dictionariesApi from "../../../../api/DictionariesApi";
import { useContext, useEffect, useState } from "react";
import { mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import MyButton from "../../../../components/basicUi/MyButton";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
import AddRecipeFilterDialog from "../dialogs/AddRecipeFilterDialog";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { EnumDictionaryContext, enumsStateModel } from "../../../../context/EnumDictionaryContext";
import { UsersContext } from "../../../../context/UserContext";

function RecipeFiltersColumn() {
    const { t } = useTranslation();
    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

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

    function getAverageRating(): { label: string, value: number }[] {
        const results = [];
        for (let i = 1; i <= 5; i++) {
            results.push({ label: String(i) + " " + t("p.andMore"), value: i })
        }
        return results;
    }

    function getAllCategories() {
        dictionariesApi.getAllCategories((response: Response<CategoryDto[]>) => {
            setAllCategories(response.value)
            setFilteredCategories(mapCategoriesToSearchList(response.value))
        })
    }

    function onCategorySearchCallback(phrase: string) {
        setFilteredCategories(mapCategoriesToSearchList(searchCategory(allCategories, phrase)))
    }

    function handleSubmit(event: any) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.Filter
        })
    };

    function onChange(fieldName: string, value: any) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.FilterFormChange,
            fieldName,
            value
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

    function onCategoriesChange(value: CategoryDto[]) {
        const matchedCategories = matchCategories(value);
        if (areCategoriesDifferent(matchedCategories)) {
            onChange("categories", matchedCategories)
        }
    }

    function matchCategories(categories: any[]) {
        return categories.map(category => {
            if (!!category.children) {
                return category;
            }
            const optionCategory = allCategories.filter(optionCategory => optionCategory.name === category.label);
            return optionCategory.length > 0 ? mapCategoriesToSearchList(optionCategory)[0] : category;
        })
    }

    function areCategoriesDifferent(matchedCategories: any[]) {
        if (!recipesFilterForm || matchedCategories.length !== recipesFilterForm.categories?.length) {
            return false;
        }
        for (let category of recipesFilterForm.categories) {
            const previousCategory = matchedCategories.filter(mCategory => mCategory.label === category.label);
            if (previousCategory.length !== 0 && previousCategory[0].children?.length !== category.children?.length) {
                return true
            }
        }
        return false;
    }

    function onUserIsOwnerChange(value: boolean, fieldName: string) {
        onChange(fieldName, (value && user?.login) || null);
    }

    function getEnum(enumName: string) {
        return enumDictionaryContext[enumName as keyof enumsStateModel] || [];
    }

    function clearFilter() {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.ClearFilterForm
        })
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
        <Form>
            <Stack className="p-5 text-start" gap={3}>
                {renderClearFiltersButton()}
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
                {renderButtons()}
            </Stack>
        </Form>
    );

    function renderUserIsOwnerInput() {
        return isUserLogged && (
            <MyCheckbox
                {...getAttributes("userIsOwner", t("p.userIsOwnerFilter"), onUserIsOwnerChange)}
                defaultChecked={recipesFilterForm?.userIsOwner || false}
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
                {...getAttributes("timeAmountTo", t("p.timeAmountToFilter"), null, 99 * 60 + 59)}
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
                options={getAverageRating()}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderHashTagInput() {
        return (
            <FilteredSelect
                {...getAttributes("hashTags", t("p.hashTagFilter"))}
                multiple
                options={filteredHashTags}
                onSearchCallback={(phrase: string) => onFilteredHashTagSearch(phrase, setFilteredHashTags)}
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
                onSearchCallback={(phrase: string) => onFilteredIngredientSearch(phrase, setFilteredIngredients)}
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
                onSearchCallback={onCategorySearchCallback}
                onSelectCallback={onCategoriesChange}
                highlightValidity={false}
                hierarchical
                className="mb-3"
            />)
    }

    function renderButtons() {
        return (
            <>
                <MyButton.Primary onClick={handleSubmit}>{t('p.search')}</MyButton.Primary >
                {renderSaveFilterButton()}
            </>
        )
    }

    function renderSaveFilterButton() {
        return isUserLogged && (
            <>
                <MyButton.Secondary onClick={() => setShowModal(true)} >{t('p.saveRecipeFilter')}</MyButton.Secondary>
                <AddRecipeFilterDialog showModal={showModal} onClose={() => setShowModal(false)}></AddRecipeFilterDialog>
            </>
        )
    }

    function renderClearFiltersButton() {
        return <MyButton.Secondary onClick={clearFilter} >{t('p.clearFilters')}</MyButton.Secondary>

    }
}

export default RecipeFiltersColumn;