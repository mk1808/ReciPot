import { useTranslation } from "react-i18next";
import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import { Recipe, RecipeIngredient } from "../../../../data/types";
import { useEffect, useState } from "react";
import { addUniqueValue, removeValue } from "../../../../utils/ListUtils";
import MyHeader from "../../../../components/basicUi/MyHeader";
import { getIngredientsFromLocalStorage, updateLocalStorage } from "../RecipeDetailsUtils";

type Props = {
    recipe: Recipe
};

function IngredientList({
    recipe
}: Props) {

    const { t } = useTranslation();
    const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
    const shouldRenderIngredients: boolean = recipe?.recipeIngredients?.length > 0;
    const isRecipeIngredientChecked = (ingredientId: string) => checkedIngredients?.indexOf(ingredientId) >= 0;

    useEffect(() => {
        setCheckedIngredients(getIngredientsFromLocalStorage(recipe));
    }, [recipe])

    function onRecipeIngredientCheck(value: boolean, ingredientId: string) {
        var newValue = value ? addUniqueValue(checkedIngredients, ingredientId) : removeValue(checkedIngredients, ingredientId);
        setCheckedIngredients(newValue)
        updateLocalStorage(newValue, recipe)
    }

    if (shouldRenderIngredients) {
        return (
            <>
                <div className="mb-5 px-5 ingredients">
                    <MyHeader title={t('p.ingredients')} level="4" />
                    <div className="px-3 list">
                        {renderIngredients()}
                    </div>
                </div>
                <hr />
            </>
        );
    }
    return (<></>);

    function renderIngredients() {
        return (
            <>
                {recipe.recipeIngredients.map(renderSingleIngredient)}
            </>
        )
    }

    function renderSingleIngredient(singleIngredient: RecipeIngredient) {
        const ingredientId = singleIngredient.id;
        return (
            <div className="my-3" key={ingredientId}>
                <MyCheckbox
                    isValid
                    name="ingredient"
                    label={renderIngredientLabel(singleIngredient)}
                    onChange={(value: boolean) => onRecipeIngredientCheck(value, ingredientId)}
                    defaultChecked={isRecipeIngredientChecked(ingredientId)} />
            </div>
        )
    }

    function renderIngredientLabel(singleIngredient: RecipeIngredient): any {
        const amount = `${singleIngredient.amount} ${singleIngredient.unit}`;
        const name = `${singleIngredient.ingredient.name}`;
        return (
            <>
                <span className="ingredient-amount">
                    {amount}
                </span>
                &nbsp;
                {name}
            </>
        );
    }
}

export default IngredientList;