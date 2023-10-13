import { useTranslation } from "react-i18next";
import { useContext, useEffect, useMemo } from "react";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import MySelect from "../../../../components/basicUi/MySelect";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
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