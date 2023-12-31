package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class GetIngredientsFromRecipe {
	public List<Ingredient> execute(Recipe recipe) {
		List<RecipeIngredient> recipeIngredients = recipe.getRecipeIngredients();
		return recipeIngredients.stream().map(RecipeIngredient::getIngredient).toList();
	}
}
