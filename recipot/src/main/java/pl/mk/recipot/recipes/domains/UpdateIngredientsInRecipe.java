package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.domains.SetRecipeNull;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class UpdateIngredientsInRecipe {
	public Recipe execute(Recipe recipe, List<RecipeIngredient> added, List<RecipeIngredient> updated) {
		added.addAll(updated);
		added.stream().forEach(new SetRecipeNull()::execute);
		recipe.setRecipeIngredients(added);
		return recipe;
	}
}
