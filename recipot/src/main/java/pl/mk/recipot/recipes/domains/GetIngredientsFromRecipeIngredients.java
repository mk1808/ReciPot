package pl.mk.recipot.recipes.domains;

import java.util.Collection;
import java.util.List;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class GetIngredientsFromRecipeIngredients {
	public List<Ingredient> execute(Collection<RecipeIngredient> recipeIngredients) {
		return recipeIngredients.stream().map(RecipeIngredient::getIngredient).toList();
	}
}
