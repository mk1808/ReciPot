package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.domains.SetRecipeNull;
import pl.mk.recipot.commons.domains.SetUserNull;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.RecipeStep;

public class CleanRecipe {
	public List<RecipeIngredient> executeIngredients(List<RecipeIngredient> ingredients) {
		ingredients.forEach(new SetRecipeNull()::execute);
		return ingredients;
	}

	public List<RecipeStep> executeSteps(List<RecipeStep> steps) {
		steps.forEach(new SetRecipeNull()::execute);
		return steps;
	}

	public Recipe executeUser(Recipe recipe) {
		return new SetUserNull().execute(recipe);
	}

}
