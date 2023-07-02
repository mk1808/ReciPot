package pl.mk.recipot.recipes.domains;

import java.util.Set;
import java.util.stream.Collectors;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class GetIngredientsFromRecipe {
	public Set<Ingredient> execute(Recipe recipe){
		Set<RecipeIngredient> recipeIngredients = recipe.getRecipeIngredients();
		return recipeIngredients.stream().map(RecipeIngredient::getIngredient).collect(Collectors.toSet());
	}
}
