package pl.mk.recipot.savedrecipefilters.domains;

import java.util.Optional;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.RecipeFilter;

public class CheckIfRecipeFilterDoesNotExists {
	public void execute(Optional<RecipeFilter> recipeFilter) {
		if (recipeFilter.isEmpty()) {
			throw new NotFoundException("savedRecipeFilters.error.savedRecipeFilterNotFound");
		}
	}
}
