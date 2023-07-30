package pl.mk.recipot.savedrecipefilters.domains;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.RecipeFilter;

public class CheckIfRecipeFilterDoesNotExists {
	public void execute(RecipeFilter recipeFilter) {
		if (recipeFilter == null) {
			throw new NotFoundException("savedRecipeFilters.error.savedRecipeFilterNotFound");
		}
	}
}
