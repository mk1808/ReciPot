import { useTranslation } from "react-i18next";
import { initAs } from "../../../../utils/ObjectUtils";
import { Recipe, RecipeStep } from "../../../../data/types";
import RecipeStepsNumbers from "../../../../components/complex/RecipeStepsNumbers";

function Steps({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    const stepText = `      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dui mi, mattis sit amet felis quis, faucibus varius enim. Cras faucibus odio nec nisl pharetra, eu convallis orci viverra. Phasellus lobortis quis ex vitae porta. Donec a est elementum, convallis lorem a, efficitur enim. Curabitur dapibus id tortor a placerat. Suspendisse felis libero, suscipit a ipsum nec, interdum blandit risus. Donec mollis nec tortor nec volutpat. Ut feugiat nunc ac elementum tincidunt.

    Donec eu orci ullamcorper, vestibulum tortor eget, faucibus augue. Nunc in est maximus, finibus dui nec, vehicula elit. Nam ullamcorper dictum lacus, nec gravida massa egestas in. Praesent in hendrerit metus. Duis a nisl volutpat nunc consequat finibus nec a velit. Duis non luctus massa. Morbi faucibus neque non diam venenatis, vel congue neque euismod. In et nisi ligula. Suspendisse ac odio sagittis, elementum sem id, elementum felis. Ut sed enim mauris. Sed rutrum, nulla nec elementum consectetur, est felis semper orci, nec porta neque metus sodales odio. Vestibulum a quam ac lectus tincidunt blandit vel vitae mauris. `
    const recipeSteps = initAs<RecipeStep[]>([{ description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText },
    { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }]
    )

    function shouldRenderSteps() {
        return recipe?.recipeSteps && recipe.recipeSteps.length > 0;
    }

    if (shouldRenderSteps()) {
        return (<>
            <div className="mb-5 px-xl-5 px-2 steps">
                <h4 className="my-3 display-4">{t('p.recipeSteps')}</h4>
                <div className="list">
                    {renderSteps()}
                </div>
            </div>
            <hr />
        </>);
    }
    return (<></>);

    function renderSteps() {
        return (
            <RecipeStepsNumbers steps={recipe.recipeSteps}></RecipeStepsNumbers>
        );
    }
}

export default Steps;