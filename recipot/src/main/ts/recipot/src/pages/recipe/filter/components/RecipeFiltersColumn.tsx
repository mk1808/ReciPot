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
import { inputAttributesForContextWithoutValidity } from "../../../../utils/FormInputUtils";
import AddRecipeFilterDialog from "../dialogs/AddRecipeFilterDialog";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { EnumDictionaryContext } from "../../../../context/EnumDictionaryContext";
import { UsersContext } from "../../../../context/UserContext";

function RecipeFiltersColumn() {
    const { t } = useTranslation();

    const recipesFilterForm = useContext(RecipeFilterContext).recipesFilterForm;
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const user = useContext(UsersContext);
    const isUserLogged = !!user;

    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const enumDictionaryContext = useContext(EnumDictionaryContext).enums;

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
            type: "filter"
        })
    };

    function onChange(fieldName: string, value: any) {
        recipeFilterDispatchContext({
            type: "filterFormChange",
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

    function onUserIsOwnerChange(fieldName: string, value: boolean) {
        onChange(fieldName, (value && user?.login) || null);
    }

    function getEnum(enumName: string) {
        return enumDictionaryContext[enumName] || [];
    }

    function clearFilter() {
        recipeFilterDispatchContext({
            type: "clearFilterForm"
        })
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
                {...inputAttributesForContextWithoutValidity("userIsOwner", t("p.userIsOwnerFilter"), onUserIsOwnerChange, recipesFilterForm)}
                defaultChecked={recipesFilterForm?.userIsOwner || false}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getEnum("accessTypes");
        return isUserLogged && (
            <MySelect
                {...inputAttributesForContextWithoutValidity("accessType", t("p.accessTypeFilter"), onChange, recipesFilterForm)}
                options={accessTypes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderNameContainsInput() {
        return (
            <MyInput
                {...inputAttributesForContextWithoutValidity("recipeName", t("p.recipeNameFilter"), onChange, recipesFilterForm)}
                placeholder={t("p.recipeNameFilter")}
            />
        )
    }

    function renderTimeAmountFromInput() {
        return (
            <TimeAmountInput
                {...inputAttributesForContextWithoutValidity("timeAmountFrom", t("p.timeAmountFromFilter"), onChange, recipesFilterForm)}
            />
        )
    }

    function renderTimeAmountToInput() {
        return (
            <TimeAmountInput
                {...inputAttributesForContextWithoutValidity("timeAmountTo", t("p.timeAmountToFilter"), onChange, recipesFilterForm, 99 * 60 + 59)}
            />
        )
    }

    function renderAmountOfDishesInput() {
        const amountOfDishes = getEnum("amountsOfDishes")
        return (
            <MySelect
                {...inputAttributesForContextWithoutValidity("amountOfDishes", t("p.amountOfDishesFilter"), onChange, recipesFilterForm)}
                options={amountOfDishes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderDifficultyInput() {
        const difficulties = getEnum("difficulties")
        return (
            <MySelect
                {...inputAttributesForContextWithoutValidity("difficulties", t("p.difficultiesFilter"), onChange, recipesFilterForm)}
                options={difficulties}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderRequiredEffortInput() {
        const requiredEffort = getEnum("requiredEfforts");
        return (
            <MySelect
                {...inputAttributesForContextWithoutValidity("requiredEffort", t("p.requiredEffortFilter"), onChange, recipesFilterForm)}
                options={requiredEffort}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderAverageRatingInput() {
        return (
            <MySelect
                {...inputAttributesForContextWithoutValidity("averageRating", t("p.averageRatingFilter"), onChange, recipesFilterForm)}
                options={getAverageRating()}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderHashTagInput() {
        return (
            <FilteredSelect
                {...inputAttributesForContextWithoutValidity("hashTags", t("p.hashTagFilter"), onChange, recipesFilterForm)}
                multiple={true}
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
                multiple={true}
                {...inputAttributesForContextWithoutValidity("ingredients", t("p.ingredientFilter"), onChange, recipesFilterForm)}
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
                {...inputAttributesForContextWithoutValidity("categories", t("p.categoryFilter"), onChange, recipesFilterForm)}
                multiple={true}
                options={filteredCategories}
                onSearchCallback={onCategorySearchCallback}
                onSelectCallback={onCategoriesChange}
                highlightValidity={false}
                hierarchical={true}
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
                <AddRecipeFilterDialog showModal={showModal} handleClose={() => setShowModal(false)}></AddRecipeFilterDialog>
            </>
        )
    }

    function renderClearFiltersButton() {
        return <MyButton.Secondary onClick={() => clearFilter()} >{t('p.clearFilters')}</MyButton.Secondary>

    }
}

export default RecipeFiltersColumn;