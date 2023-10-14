import { useTranslation } from "react-i18next";

import MyHeader from "../../../../components/basicUi/MyHeader";
import RecipeStepsNumbers from "../../../../components/complex/RecipeStepsNumbers";
import { Recipe } from "../../../../data/types";

type Props = {
    recipe: Recipe
};

function Steps({
    recipe
}: Props) {

    const { t } = useTranslation();
    const shouldRenderSteps = () => (recipe?.recipeSteps && recipe.recipeSteps.length > 0);

    if (shouldRenderSteps()) {
        return (
            <>
                <div className="mb-5 px-xl-5 px-2 steps">
                    <MyHeader title={t('p.recipeSteps')} level="4" />
                    <div className="list mt-4">
                        {renderSteps()}
                    </div>
                </div>
                <hr />
            </>
        );
    }
    return (<></>);

    function renderSteps() {
        return <RecipeStepsNumbers steps={recipe.recipeSteps} />
    }
}

export default Steps;