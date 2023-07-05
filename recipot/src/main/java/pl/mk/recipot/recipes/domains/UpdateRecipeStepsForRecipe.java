package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeStep;

public class UpdateRecipeStepsForRecipe {
	public List<RecipeStep> execute(Recipe recipe, List<RecipeStep> steps){
		steps.forEach(step->step.setRecipe(recipe));
		return steps;
	}
}
