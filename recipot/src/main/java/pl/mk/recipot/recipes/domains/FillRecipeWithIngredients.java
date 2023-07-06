package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class FillRecipeWithIngredients {
	public Recipe execute(Recipe recipe, List<RecipeIngredient> added, List<RecipeIngredient> updated) {
		added.addAll(updated);
		added.stream().forEach(ri -> ri.setRecipe(null));
		recipe.setRecipeIngredients(added);
		return recipe;

	}

}
