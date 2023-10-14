import { useState, useEffect } from "react";
import { Recipe } from "../data/types";
import { getNumberOfElements } from "../utils/MathUtils";

type Props = {
    recipes: Recipe[],
    recipeCardRef: any,
    categoriesRef: any,
    containerRef: any,
    isLoaded: boolean
};

function useOtherRecipes({
    recipes,
    recipeCardRef,
    categoriesRef,
    containerRef,
    isLoaded
}: Props): Recipe[] {
    const [recipeCardHeight, setRecipeCardHeight] = useState<any>();
    const [selectedRecipes, setSelectedRecipes] = useState<any[]>(recipes);
    const containerHeight = containerRef.current?.clientHeight;

    useEffect(() => {
        if ((!recipeCardHeight && recipeCardRef.current) || recipeCardRef.current?.clientHeight > recipeCardHeight) {
            setRecipeCardHeight(recipeCardRef.current?.clientHeight)
        }
    }, [recipeCardRef.current])

    useEffect(() => {
        const numberOfElements = getNumberOfElements(containerHeight, categoriesRef.current.clientHeight, recipeCardHeight)
        setSelectedRecipes(recipes.slice(0, numberOfElements))
    }, [isLoaded, containerHeight, recipes, recipeCardHeight])

    return selectedRecipes.length > 0 ? selectedRecipes : recipes.slice(0, 1);
}

export default useOtherRecipes;