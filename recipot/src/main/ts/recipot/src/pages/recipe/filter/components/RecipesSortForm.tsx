import { useTranslation } from "react-i18next";
import { useContext, useEffect, useMemo } from "react";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import MySelect from "../../../../components/basicUi/MySelect";
import { inputAttributesForContextWithoutValidity } from "../../../../utils/FormInputUtils";
import MyButton from "../../../../components/basicUi/MyButton";
import { Stack } from "react-bootstrap";
import { getRecipesSortOptions } from "../utils/RecipeSearchUtils";

function RecipesSortForm() {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    const recipesSortOptions = useMemo(() => getRecipesSortOptions(t), []);

    useEffect(() => {
        onChange("recipesSort", recipesSortOptions[0].value)
    }, []);

    function onSearch() {
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

    function getRecipeSortInputParams() {
        return {
            ...inputAttributesForContextWithoutValidity("recipesSort", t("p.recipesSort"), onChange, recipeFilterContext.recipesFilterForm),
            options: recipesSortOptions
        };
    }

    return (
        <Stack className="p-5 text-start" gap={3}>
            {renderSortSelect()}
            {renderSearchButton()}
        </Stack>
    )

    function renderSortSelect() {
        return (
            <MySelect
                {...getRecipeSortInputParams()}
            />
        )
    }

    function renderSearchButton() {
        return (
            <MyButton.Primary onClick={onSearch}>
                {t('p.search')}
            </MyButton.Primary >
        )
    }
}

export default RecipesSortForm;