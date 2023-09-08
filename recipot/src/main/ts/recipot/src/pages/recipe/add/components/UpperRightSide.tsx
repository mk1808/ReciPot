import { useTranslation } from "react-i18next";
import MySelect from "../../../../components/basicUi/MySelect";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import { getAccessTypes, getAmountOfDishes, getDifficulties, getRequiredEfforts, mapCategoriesToSearchList, onFilteredHashTagSearch, onFilteredIngredientSearch, searchCategory } from "../../../../utils/DictionariesUtils";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import { useEffect, useState } from "react";
import dictionariesApi from "../../../../api/DictionariesApi";
import { CategoryDto, Response } from "../../../../data/types";

function UpperRightSide() {
    const { t } = useTranslation();
    const [filteredHashTags, setFilteredHashTags] = useState<any[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);

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
                name="timeAmountFrom"
                label={"Ilość czasu na przygotowanie"}
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

    function renderHashTagInput() {
        return <FilteredSelect
            multiple={true}
            className="mb-3"
            label={t("p.hashTagFilter")}
            options={filteredHashTags}
            onSearchCallback={(phrase: string) => onFilteredHashTagSearch(phrase, setFilteredHashTags)}
            onSelectCallback={() => { }}
            highlightValidity={false}
            width={500} />
    }

    function renderCategoryInput() {
        return <FilteredSelect
            multiple={true}
            className="mb-3"
            label={t("p.categoryFilter")}
            options={filteredCategories}
            onSearchCallback={onCategorySearchCallback}
            onSelectCallback={() => { }}
            highlightValidity={false}
            hierarchical={true}
            width={500} />
    }
}

export default UpperRightSide;