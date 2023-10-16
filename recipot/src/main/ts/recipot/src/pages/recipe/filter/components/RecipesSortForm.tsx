import { useContext, useEffect, useMemo } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MyButton from "../../../../components/basicUi/MyButton";
import MySelect from "../../../../components/basicUi/MySelect";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { getRecipesSortOptions } from "../utils/RecipeSearchUtils";

function RecipesSortForm() {
    const { t } = useTranslation();

    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    const recipesSortOptions = useMemo(() => getRecipesSortOptions(t), []);

    useEffect(() => {
        onChange(recipesSortOptions[0].value, "recipesSort")
    }, []);

    function onSearch() {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.Filter
        })
    };

    function onChange(value: any, fieldName: string) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.FilterFormChange,
            fieldName,
            value
        })
    }

    function getAttributes(name: string, label: string) {
        return inputAttrs({
            name,
            label,
            onChange,
            formObject: recipeFilterContext.recipesFilterForm,
            type: InputAttrsType.ContextNoValidation
        });
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
                {...getAttributes("recipesSort", t("p.recipesSort"))}
                options={recipesSortOptions}
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