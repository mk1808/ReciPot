import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CategoryDto, Recipe } from "../../../../data/types";
import RecipeCard from "../../../../components/complex/RecipeCard";
import CategoryCard from "../../../../components/complex/CategoryCard";
import MyHeader from "../../../../components/basicUi/MyHeader";
import useMyNav from "../../../../hooks/useMyNav";
import useCategories from "../../../../hooks/useCategories";
import useOtherRecipes from "../../../../hooks/useOtherRecipes";

type Props = {
    recipes: Recipe[]
};

function OtherColumn({
    recipes
}: Props) {

    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState<any>(false);

    const nav = useMyNav();
    const [, , allCategories] = useCategories();
    const containerRef = useRef<any>(null);
    const recipeCardRef = useRef<any>(null);
    const categoriesRef = useRef<any>(null);
    const selectedRecipes = useOtherRecipes({ recipes, recipeCardRef, categoriesRef, containerRef, isLoaded });

    const onGoToRecipe = (recipe: Recipe, event: any) => nav.openInBackground({ id: recipe.id }, event);
    const onCategoryClick = (category: CategoryDto) => nav.goToCategoryFilters(category);

    useEffect(() => {
        setTimeout(() => { setIsLoaded(true) }, 1000)
    }, [allCategories])

    return (
        <div className="h-100 other" ref={containerRef}>
            <div className="py-4 categories" ref={categoriesRef}>
                <MyHeader title={t('p.categories')} level="3" dispLevel="4" />
                {renderCategories()}
            </div>
            <hr></hr>
            <div className="py-4 recipes" >
                <MyHeader title={t('p.recipes')} level="3" dispLevel="4" />
                {renderRecipes()}
            </div>
        </div>
    )

    function renderCategories() {
        return (
            <>
                {allCategories.map(renderCategory)}
            </>
        )
    }

    function renderCategory(category: CategoryDto) {
        return (
            <CategoryCard
                category={category}
                showChildren={false}
                className="category-no-border"
                key={category.id}
                onCategorySelect={onCategoryClick} />
        )
    }

    function renderRecipes() {
        return (
            <div className="list mt-1">
                {selectedRecipes.map(renderSingleRecipe)}
            </div>
        )
    }

    function renderSingleRecipe(recipe: Recipe) {
        return (
            <RecipeCard
                recipe={recipe}
                onGoToRecipe={onGoToRecipe}
                key={recipe.id}
                className="mx-auto mb-3"
                ref={recipeCardRef} />
        )
    }
}

export default OtherColumn;