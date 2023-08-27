import { useTranslation } from "react-i18next";
import MyCheckbox from "../../../../components/basicUi/MyCheckbox";
import { Ingredient, RecipeIngredient } from "../../../../data/types";
import { initAs } from "../../../../utils/ObjectUtils";

function IngredientList() {
    const { t } = useTranslation();
    const ingr1: RecipeIngredient[] =
        [
            {
                id: '1',
                ingredient: { id: '1', name: "jajek" },
                amount: 6,
                unit: "szt",
                recipe: initAs()
            },
            {
                id: '2',
                ingredient: { id: '2', name: "buraczki" },
                amount: 1,
                unit: "szt",
                recipe: initAs()
            },
            {
                id: '3',
                ingredient: { id: '3', name: "roszponki" },
                amount: 1,
                unit: "szt",
                recipe: initAs()
            },
            {
                id: '4',
                ingredient: { id: '4', name: "sera favita, fety lub sałatkowego" },
                amount: 100,
                unit: "g",
                recipe: initAs()
            },
            {
                id: '5',
                ingredient: { id: '5', name: "awokado" },
                amount: 1,
                unit: "szt",
                recipe: initAs()
            },
            {
                id: '6',
                ingredient: { id: '6', name: "majonezu" },
                amount: 2,
                unit: "łyżka",
                recipe: initAs()
            },

            {
                id: '7',
                ingredient: { id: '7', name: "musztardy" },
                amount: 1,
                unit: "łyżka",
                recipe: initAs()
            },
            {
                id: '8',
                ingredient: { id: '8', name: "soku z cytryny" },
                amount: 1,
                unit: "łyżka",
                recipe: initAs()
            }];
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
                {ingr1.map(singleIngredient => { return renderSingleIngredient(singleIngredient) })}
            </>

        )
    }
    function getIngredient(singleIngredient: RecipeIngredient): any {
        let aomunt = `${singleIngredient.amount} ${singleIngredient.unit}`;
        return (<><span className="imp">{aomunt}</span>&nbsp;{`${singleIngredient.ingredient.name}`} </>);
    }
    function renderSingleIngredient(singleIngredient: RecipeIngredient) {
        return (
            <div className="my-3">
                <MyCheckbox required={false} isValid={true} name="ingredient" label={getIngredient(singleIngredient)} onChange={(value: boolean) => console.log(value)} defaultChecked={false} />

            </div>
        )
    }
}

export default IngredientList;