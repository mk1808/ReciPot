import { Recipe } from "../../../data/types";

const CHECKED = "checkedIngredients";

export function getIngredientsFromLocalStorage(recipe: Recipe) {
    var recipesIngredients: any = localStorage.getItem(CHECKED);
    if (!recipesIngredients) {
        recipesIngredients = {};
        saveInLocalStorage(recipesIngredients);
    }
    return JSON.parse(recipesIngredients)[recipe.id] || [];
}

export function updateLocalStorage(newValue: any, recipe: Recipe) {
    var recipesIngredients: any = JSON.parse(localStorage.getItem(CHECKED) || "");
    recipesIngredients[recipe.id] = newValue;
    saveInLocalStorage(recipesIngredients);
}

function saveInLocalStorage(recipesIngredients: any) {
    localStorage.setItem(CHECKED, JSON.stringify(recipesIngredients));
}


