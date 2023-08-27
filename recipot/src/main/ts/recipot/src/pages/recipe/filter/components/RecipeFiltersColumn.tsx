import { Form, Stack } from "react-bootstrap";
import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import { useTranslation } from 'react-i18next';
import MySelect from "../../../../components/basicUi/MySelect";
import { CategoryDto, HashTag, Ingredient, Response } from "../../../../data/types";
import MyInput from "../../../../components/basicUi/MyInput";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import dictionariesApi from "../../../../api/DictionariesApi";
import { useEffect, useReducer, useState } from "react";
import { getAccessTypes, getAmountOfDishes, getDifficulties, getRequiredEfforts, mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import MyButton from "../../../../components/basicUi/MyButton";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { checkInputValidity, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";

function RecipeFiltersColumn({ formSave }: { formSave: FormSave }) {
    const { t } = useTranslation();

    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, getEmptyForm());

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
        formSave.onSubmit(myForm.formValue);
        preventFurtherAction(event);
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    }

    function onHashTagChange(value: HashTag[]) {
        if (value.length !== myForm.formValue.hashTags?.length) {
            dispatchForm({ type: "hashTags", value: value })
        }
    }

    function onIngredientsChange(value: Ingredient[]) {
        if (value.length !== myForm.formValue.ingredients?.length) {
            dispatchForm({ type: "ingredients", value: value })
        }
    }

    function onCategoriesChange(value: CategoryDto[]) {
        if (value.length !== myForm.formValue.categories?.length) {
            dispatchForm({ type: "categories", value: value })
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
                {...inputAttributes("userIsOwner", myForm, dispatchForm)}
                label={t("p.userIsOwnerFilter")}
                defaultChecked={false}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getAccessTypes(t);
        return (
            <MySelect
                {...inputAttributes("accessType", myForm, dispatchForm)}
                label={t("p.accessTypeFilter")}
                options={accessTypes}
                defaultValue={accessTypes[0].value}
            />
        )
    }

    function renderNameContainsInput() {
        return (
            < MyInput
                {...inputAttributes("recipeName", myForm, dispatchForm)}
                label={t("p.recipeNameFilter")}
                placeholder={t("p.recipeNameFilter")}
            />
        )
    }

    function renderTimeAmountFromInput() {
        return (
            <TimeAmountInput
                {...inputAttributes("timeAmountFrom", myForm, dispatchForm)}
                label={t("p.timeAmountFromFilter")}
            />
        )
    }

    function renderTimeAmountToInput() {
        return (
            <TimeAmountInput
                {...inputAttributes("timeAmountTo", myForm, dispatchForm)}
                label={t("p.timeAmountToFilter")}
            />
        )
    }

    function renderAmountOfDishesInput() {
        const amountOfDishes = getAmountOfDishes(t);
        return (
            <MySelect
                {...inputAttributes("amountOfDishes", myForm, dispatchForm)}
                label={t("p.amountOfDishesFilter")}
                options={amountOfDishes}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderDifficultyInput() {
        const difficulties = getDifficulties(t);
        return (
            <MySelect
                {...inputAttributes("difficulties", myForm, dispatchForm)}
                label={t("p.difficultiesFilter")}
                options={difficulties}
                emptyOption={t('p.selectValue')}
            />
        )
    }

    function renderRequiredEffortInput() {
        const requiredEffort = getRequiredEfforts(t);
        return (
            <MySelect
                {...inputAttributes("requiredEffort", myForm, dispatchForm)}
                label={t("p.requiredEffortFilter")}
                options={requiredEffort}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderAverageRatingInput() {
        return (
            <MySelect
                {...inputAttributes("averageRating", myForm, dispatchForm)}
                label={t("p.averageRatingFilter")}
                options={getAverageRating()}
                emptyOption={t('p.selectValue')}
            />)
    }

    function renderHashTagInput() {
        return (
            <FilteredSelect
                {...inputAttributes("hashTags", myForm, dispatchForm)}
                multiple={true}
                label={t("p.hashTagFilter")}
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
                {...inputAttributes("ingredients", myForm, dispatchForm)}
                label={t("p.ingredientFilter")}
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
                {...inputAttributes("categories", myForm, dispatchForm)}
                multiple={true}
                label={t("p.categoryFilter")}
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
            <MyButton.Secondary onClick={() => { }} >{t('p.saveRecipeFilter')}</MyButton.Secondary>
        </>
    }
}

export default RecipeFiltersColumn;