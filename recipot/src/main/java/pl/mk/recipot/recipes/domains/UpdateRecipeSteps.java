package pl.mk.recipot.recipes.domains;

import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeStep;

public class UpdateRecipeSteps {
	public List<RecipeStep> execute(Recipe recipe) {
		List<RecipeStep> steps = recipe.getRecipeSteps();
		
		steps.forEach(step -> step.setRecipe(recipe));

		List<RecipeStep> updatedSteps = steps.stream().sorted(Comparator.comparingInt(RecipeStep::getOrder)).toList();
		IntStream.range(0, steps.size()).forEach(i -> updatedSteps.get(i).setOrder(i));

		return steps;
	}
}
