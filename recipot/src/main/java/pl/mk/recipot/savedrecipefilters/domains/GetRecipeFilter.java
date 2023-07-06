package pl.mk.recipot.savedrecipefilters.domains;

import java.util.Optional;

import pl.mk.recipot.commons.models.RecipeFilter;

public class GetRecipeFilter {
	public RecipeFilter execute(Optional<RecipeFilter> recipeFilter) {
		return recipeFilter.orElse(null);
	}
}
