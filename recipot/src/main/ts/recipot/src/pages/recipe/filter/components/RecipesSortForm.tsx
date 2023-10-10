import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import MySelect from "../../../../components/basicUi/MySelect";
import { inputAttributesForContextWithoutValidity } from "../../../../utils/FormInputUtils";
import MyButton from "../../../../components/basicUi/MyButton";
import { Stack } from "react-bootstrap";

function RecipesSortForm() {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    useEffect(() => {
        onChange("recipesSort", getRecipesSortOptions()[0].value)
    }, []);

    function getRecipesSortOptions(): any[] {
        const sortByFields = ["name", "ratingsCount", "averageRating", "created"]
        const orders = ["ASC", "DESC"]
        const options: any[] = [];

        sortByFields.forEach(fieldName => {
            orders.forEach(order => {
                options.push({ label: t(`enums.RecipesSort.${fieldName}${order}`), value: { fieldName, order } })
            })
        })

        return options;
    }

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

    return (
        <Stack className="p-5 text-start" gap={3}>
            {renderSortSelect()}
            {renderSearchButton()}
        </Stack>
    )

    function renderSortSelect() {
        return (
            <MySelect
                {...inputAttributesForContextWithoutValidity("recipesSort", t("p.recipesSort"), onChange, recipeFilterContext.recipesFilterForm)}
                options={getRecipesSortOptions()}
            />
        )
    }

    function renderSearchButton() {
        return <MyButton.Primary onClick={onSearch}>{t('p.search')}</MyButton.Primary >
    }
}

export default RecipesSortForm;