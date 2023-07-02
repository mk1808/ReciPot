package pl.mk.recipot.recipes.domains;

import java.util.Set;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.RecipeStep;

public class UpdateRecipeStepsForRecipe {
	public Set<RecipeStep> execute(Recipe recipe, Set<RecipeStep> steps){
		steps.forEach(step->step.setRecipe(recipe));
		return steps;
	}
}
