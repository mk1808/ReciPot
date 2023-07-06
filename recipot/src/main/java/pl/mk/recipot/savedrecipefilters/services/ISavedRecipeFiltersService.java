package pl.mk.recipot.savedrecipefilters.services;

import java.util.List;

import pl.mk.recipot.commons.models.RecipeFilter;

public interface ISavedRecipeFiltersService {

	List<RecipeFilter> getUserFilters();
}
