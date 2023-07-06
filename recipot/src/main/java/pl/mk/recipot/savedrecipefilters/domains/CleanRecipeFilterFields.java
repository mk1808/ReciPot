package pl.mk.recipot.savedrecipefilters.domains;

import pl.mk.recipot.commons.models.RecipeFilter;

public class CleanRecipeFilterFields {
	public RecipeFilter executte(RecipeFilter recipeFilter) {
		recipeFilter.setOwner(null);
		return recipeFilter;
	}
}
