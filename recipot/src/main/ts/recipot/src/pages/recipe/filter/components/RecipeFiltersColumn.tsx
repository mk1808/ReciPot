import { Form, Stack } from "react-bootstrap";
import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import { useTranslation } from 'react-i18next';
import MySelect from "../../../../components/basicUi/MySelect";
import { CategoryDto, Response } from "../../../../data/types";
import MyInput from "../../../../components/basicUi/MyInput";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import dictionariesApi from "../../../../api/DictionariesApi";
import { useEffect, useState } from "react";
import { getAccessTypes, getAmountOfDishes, getDifficulties, getRequiredEfforts, mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import MyButton from "../../../../components/basicUi/MyButton";

function RecipeFiltersColumn() {
    const { t } = useTranslation();

    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);

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

    return (<Form>
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
    </Form>);

    function renderUserIsOwnerInput() {
        return (
            <MyCheckbox
                name="userIsOwner"
                label={t("p.userIsOwnerFilter")}
                onChange={() => { }}
            />
        )
    }

    function renderAccessTypeInput() {
        const accessTypes = getAccessTypes(t);
        return (
            <MySelect
                name="accessType"
                label={t("p.accessTypeFilter")}
                options={accessTypes}
                defaultValue={accessTypes[0].value}
                onChange={() => { }}
            />
        )
    }

    function renderNameContainsInput() {
        return (
            < MyInput
                name="recipeName"
                label={t("p.recipeNameFilter")}
                placeholder={t("p.recipeNameFilter")}
                onChange={() => { }}
            />
        )
    }

    function renderTimeAmountFromInput() {
        return (
            <TimeAmountInput
                name="timeAmountFrom"
                label={t("p.timeAmountFromFilter")}
                onChange={() => { }}
            />
        )
    }

    function renderTimeAmountToInput() {
        return (
            <TimeAmountInput
                name="timeAmountTo"
                label={t("p.timeAmountToFilter")}
                onChange={() => { }}
            />
        )
    }

    function renderAmountOfDishesInput() {
        const amountOfDishes = getAmountOfDishes(t);
        return (
            <MySelect
                name="amountOfDishes"
                label={t("p.amountOfDishesFilter")}
                options={amountOfDishes}
                emptyOption={t('p.selectValue')}
                onChange={() => { }}
            />
        )
    }

    function renderDifficultyInput() {
        const difficulties = getDifficulties(t);
        return (
            <MySelect
                name="difficulties"
                label={t("p.difficultiesFilter")}
                options={difficulties}
                emptyOption={t('p.selectValue')}
                onChange={() => { }}
            />
        )
    }

    function renderRequiredEffortInput() {
        const requiredEffort = getRequiredEfforts(t);
        return (
            <MySelect
                name="requiredEffort"
                label={t("p.requiredEffortFilter")}
                options={requiredEffort}
                emptyOption={t('p.selectValue')}
                onChange={() => { }}
            />)
    }

    function renderAverageRatingInput() {
        return (
            <MySelect
                name="averageRating"
                label={t("p.averageRatingFilter")}
                options={getAverageRating()}
                emptyOption={t('p.selectValue')}
                onChange={() => { }}
            />)
    }

    function renderHashTagInput() {
        return <FilteredSelect
            multiple={true}
            label={t("p.hashTagFilter")}
            options={filteredHashTags}
            onSearchCallback={(phrase: string) => onFilteredHashTagSearch(phrase, setFilteredHashTags)}
            onSelectCallback={() => { }}
            highlightValidity={false}
            width={300} />
    }

    function renderIngredientInput() {
        return <FilteredSelect
            multiple={true}
            label={t("p.ingredientFilter")}
            options={filteredIngredients}
            onSearchCallback={(phrase: string) => onFilteredIngredientSearch(phrase, setFilteredIngredients)}
            onSelectCallback={() => { }}
            highlightValidity={false}
            width={300} />
    }

    function renderCategoryInput() {
        return <FilteredSelect
            multiple={true}
            label={t("p.categoryFilter")}
            options={filteredCategories}
            onSearchCallback={onCategorySearchCallback}
            onSelectCallback={() => { }}
            highlightValidity={false}
            hierarchical={true}
            width={300} />
    }

    function renderButtons() {
        return <>
            <MyButton.Primary onClick={() => { }}>{t('p.search')}</MyButton.Primary>
            <MyButton.Secondary onClick={() => { }} >{t('p.saveRecipeFilter')}</MyButton.Secondary>
        </>
    }
}

export default RecipeFiltersColumn;