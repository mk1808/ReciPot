package pl.mk.recipot.recipes.domains;

import java.util.List;
import java.util.Set;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.RecipeStep;

public class CleanRecipe {
	public List<RecipeIngredient> executeIngredients(List<RecipeIngredient> ingredients) {
		ingredients.forEach(ingredient->ingredient.setRecipe(null));
		return ingredients;
	}
	
	public List<RecipeStep> executeSteps(List<RecipeStep> steps) {
		steps.forEach(step->step.setRecipe(null));
		return steps;
	}

}
