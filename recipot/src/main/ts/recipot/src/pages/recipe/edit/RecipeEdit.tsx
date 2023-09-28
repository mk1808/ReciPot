import { useTranslation } from "react-i18next";
import RecipeAdd from "../add/RecipeAdd";
import { useState, useEffect, useContext } from "react";
import recipesApi from "../../../api/RecipesApi";
import { useParams } from "react-router-dom";
import { Recipe } from "../../../data/types";
import { initAs } from "../../../utils/ObjectUtils";
import { AddRecipeDispatchContext } from "../../../context/AddRecipeContext";

function RecipeEdit() {
    const { t } = useTranslation();
    const params = useParams();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<any | Recipe>(initAs());
    const id: string = params.id ?? "";
    function onGetRecipeSuccess(response: any) {
        setRecipe(response.value);
    }

    useEffect(() => {
        setIsLoaded(false);
        recipesApi.getRecipe(id, onGetRecipeSuccess);

    }, [])
    return (
        <RecipeAdd recipe = {recipe}></RecipeAdd>
    );
}

export default RecipeEdit;