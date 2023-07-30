package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.Recipe;

public class CheckIfRecipeDoesNotExists {
	public void execute(Recipe recipe) {
		if (recipe == null) {
			throw new NotFoundException("recipes.error.recipeNotFound");
		}
	}
}
