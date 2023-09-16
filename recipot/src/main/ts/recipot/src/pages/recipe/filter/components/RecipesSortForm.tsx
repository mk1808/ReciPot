import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import MySelect from "../../../../components/basicUi/MySelect";
import { inputAttributesForContextWithoutValidity } from "../../../../utils/FormInputUtils";

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

    function onChange(fieldName: string, value: any) {
        recipeFilterDispatchContext({
            type: "filterFormChange",
            fieldName,
            value
        })
    }

    return (
        <div className="p-5 text-start">
            {renderSortSelect()}
        </div>
    )

    function renderSortSelect() {
        return (
            <MySelect
                {...inputAttributesForContextWithoutValidity("recipesSort", t("p.recipesSort"), onChange, recipeFilterContext.recipesFilterForm)}
                options={getRecipesSortOptions()}
            />
        )
    }
}

export default RecipesSortForm;