import { useTranslation } from "react-i18next";
import { initAs } from "../../../../utils/ObjectUtils";
import { Recipe, RecipeStep } from "../../../../data/types";
import RecipeStepsNumbers from "../../../../components/complex/RecipeStepsNumbers";
import MyHeader from "../../../../components/basicUi/MyHeader";

function Steps({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    function shouldRenderSteps() {
        return recipe?.recipeSteps && recipe.recipeSteps.length > 0;
    }

    if (shouldRenderSteps()) {
        return (<>
            <div className="mb-5 px-xl-5 px-2 steps">
                <MyHeader title={t('p.recipeSteps')} level="4" />
                <div className="list mt-4">
                    {renderSteps()}
                </div>
            </div>
            <hr />
        </>);
    }
    return (<></>);

    function renderSteps() {
        return (
            <RecipeStepsNumbers steps={recipe.recipeSteps}/>
        );
    }
}

export default Steps;