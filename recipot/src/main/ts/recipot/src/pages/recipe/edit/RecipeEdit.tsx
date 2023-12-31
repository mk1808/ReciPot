import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import recipesApi from "../../../api/RecipesApi";
import { Recipe } from "../../../data/types";
import { initAs } from "../../../utils/ObjectUtils";
import RecipeAdd from "../add/RecipeAdd";

function RecipeEdit() {
    const [, setIsLoaded] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<any | Recipe>(initAs());    
    const params = useParams();
    const id: string = params.id ?? "";

    useEffect(() => {
        setIsLoaded(false);
        recipesApi.getRecipe(id, onGetRecipeSuccess);
    }, [])

    function onGetRecipeSuccess(response: any) {
        setRecipe(response.value);
    }

    return <RecipeAdd recipe={recipe} />
}

export default RecipeEdit;