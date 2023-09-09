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
import { getAccessTypes, getAmountOfDishes, getDifficulties, getRequiredEfforts, mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import MyButton from "../../../../components/basicUi/MyButton";
import { FormSave } from "../../../../data/utilTypes";
import { preventFurtherAction } from "../../../../utils/FormInputUtils";
import AddRecipeFilterDialog from "../dialogs/AddRecipeFilterDialog";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";

function RecipeFiltersColumn({ formSave }: { formSave: FormSave }) {
    const { t } = useTranslation();

    const recipesFilterForm = useContext(RecipeFilterContext).recipesFilterForm;
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

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
        if (!recipesFilterForm || value.length !== recipesFilterForm.categories?.length) {
            onChange("categories", value)
        }
    }

    function initAttributes(name: string, label: string, defaultValue?: any) {
        return {
            name,
            label: t(label),
            onChange: (value: string) => onChange(name, value),
            defaultValue: (recipesFilterForm && recipesFilterForm[name]) || defaultValue
        }
    }

    return (
        <Form onSubmit={() => console.log("asd")}>
            <Stack className="p-5 text-start" gap={3}>
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
        return (
            <MyCheckbox
                {...initAttributes("userIsOwner", "p.userIsOwnerFilter")}
                defaultChecked={recipesFilterForm?.userIsOwner || false}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getAccessTypes(t);
        return (
            <MySelect
                {...initAttributes("accessType", "p.accessTypeFilter")}
                options={accessTypes}
            />
        )
    }

    function renderNameContainsInput() {
        return (
            < MyInput
                {...initAttributes("recipeName", "p.recipeNameFilter")}
                placeholder={t("p.recipeNameFilter")}
            />
        )
    }

    function renderTimeAmountFromInput() {
        return (
            <TimeAmountInput
                {...initAttributes("timeAmountFrom", "p.timeAmountFromFilter")}
            />
        )
    }

    function renderTimeAmountToInput() {
        return (
            <TimeAmountInput
                {...initAttributes("timeAmountTo", "p.timeAmountToFilter", 99 * 60 + 59)}
            />
        )
    }

    function renderAmountOfDishesInput() {
        const amountOfDishes = getAmountOfDishes(t);
        return (
            <MySelect
                {...initAttributes("amountOfDishes", "p.amountOfDishesFilter")}
                options={amountOfDishes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderDifficultyInput() {
        const difficulties = getDifficulties(t);
        return (
            <MySelect
                {...initAttributes("difficulties", "p.difficultiesFilter")}
                options={difficulties}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderRequiredEffortInput() {
        const requiredEffort = getRequiredEfforts(t);
        return (
            <MySelect
                {...initAttributes("requiredEffort", "p.requiredEffortFilter")}
                options={requiredEffort}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderAverageRatingInput() {
        return (
            <MySelect
                {...initAttributes("averageRating", "p.averageRatingFilter")}
                options={getAverageRating()}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderHashTagInput() {
        return (
            <FilteredSelect
                {...initAttributes("hashTags", "p.hashTagFilter")}
                multiple={true}
                options={filteredHashTags}
                onSearchCallback={(phrase: string) => onFilteredHashTagSearch(phrase, setFilteredHashTags)}
                onSelectCallback={onHashTagChange}
                highlightValidity={false}
                className="mb-3"
                width={300}
            />)
    }

    function renderIngredientInput() {
        return (
            <FilteredSelect
                multiple={true}
                {...initAttributes("ingredients", "p.ingredientFilter")}
                options={filteredIngredients}
                onSearchCallback={(phrase: string) => onFilteredIngredientSearch(phrase, setFilteredIngredients)}
                onSelectCallback={onIngredientsChange}
                highlightValidity={false}
                className="mb-3"
                width={300}
            />)
    }

    function renderCategoryInput() {
        return (
            <FilteredSelect
                {...initAttributes("categories", "p.categoryFilter")}
                multiple={true}
                options={filteredCategories}
                onSearchCallback={onCategorySearchCallback}
                onSelectCallback={onCategoriesChange}
                highlightValidity={false}
                hierarchical={true}
                className="mb-3"
                width={300}
            />)
    }

    function renderButtons() {
        return <>
            <MyButton.Primary onClick={handleSubmit}>{t('p.search')}</MyButton.Primary >
            <MyButton.Secondary onClick={() => setShowModal(true)} >{t('p.saveRecipeFilter')}</MyButton.Secondary>
            <AddRecipeFilterDialog showModal={showModal} handleClose={() => setShowModal(false)}></AddRecipeFilterDialog>
        </>
    }
}

export default RecipeFiltersColumn;