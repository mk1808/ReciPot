import { useTranslation } from "react-i18next";
import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import { Recipe, RecipeIngredient } from "../../../../data/types";
import { useEffect, useState } from "react";
import { addUniqueValue, removeValue } from "../../../../utils/ListUtils";

function IngredientList({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])

    useEffect(() => {
        setCheckedIngredients(getRecipeCheckedIngredients());
    }, [recipe])

    function getRecipeCheckedIngredients(): string[] {
        var recipesIngredients: any = localStorage.getItem("checkedIngredients");
        if (!recipesIngredients) {
            recipesIngredients = JSON.stringify({});
            localStorage.setItem("checkedIngredients", recipesIngredients)
        }
        return JSON.parse(recipesIngredients)[recipe.id] || [];
    }

    function isRecipeIngredientChecked(ingredientId: string) {
        return checkedIngredients?.indexOf(ingredientId) >= 0;
    }

    function onRecipeIngredientCheck(value: boolean, ingredientId: string) {
        var newValue = value ? addUniqueValue(checkedIngredients, ingredientId) : removeValue(checkedIngredients, ingredientId);

        setCheckedIngredients(newValue)
        updateLocalStorage(newValue)
    }

    function updateLocalStorage(newValue: any) {
        var recipesIngredients: any = JSON.parse(localStorage.getItem("checkedIngredients") || "");
        recipesIngredients[recipe.id] = newValue
        localStorage.setItem("checkedIngredients", JSON.stringify(recipesIngredients))
    }

    return (
        <div className="mb-5 px-5 ingredients">
            <h4 className="my-3 display-4">{t('p.ingredients')}</h4>
            <div className="px-3 list ">
                {renderIngredients()}
            </div>
        </div>
    )
    function renderIngredients() {
        return (
            <>
                {recipe.recipeIngredients.map(singleIngredient => renderSingleIngredient(singleIngredient) )}
            </>
        )
    }
    function renderSingleIngredient(singleIngredient: RecipeIngredient) {
        const ingredientId = singleIngredient.id
        return (
            <div className="my-3" key={ingredientId}>
                <MyCheckbox
                    required={false}
                    isValid={true}
                    name="ingredient"
                    label={renderIngredientLabel(singleIngredient)}
                    onChange={(value: boolean) => onRecipeIngredientCheck(value, ingredientId)}
                    defaultChecked={isRecipeIngredientChecked(ingredientId)} />
            </div>
        )
    }
    function renderIngredientLabel(singleIngredient: RecipeIngredient): any {
        let amount = `${singleIngredient.amount} ${singleIngredient.unit}`;
        return (
            <>
                <span className="ingredient-amount">{amount}</span>&nbsp;
                {`${singleIngredient.ingredient.name}`}
            </>
        );
    }
}

export default IngredientList;