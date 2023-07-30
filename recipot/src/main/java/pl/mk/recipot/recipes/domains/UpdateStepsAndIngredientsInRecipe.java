package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.RecipeStep;

public class UpdateStepsAndIngredientsInRecipe {
	public Recipe execute(Recipe recipe, List<RecipeIngredient> ingredients, List<RecipeStep> steps) {
		recipe.setRecipeSteps(steps);
		recipe.setRecipeIngredients(ingredients);
		return recipe;

	}
}
