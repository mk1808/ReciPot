package pl.mk.recipot.savedrecipefilters.services;

import java.util.List;

import pl.mk.recipot.savedrecipefilters.dtos.RecipeFilterDto;

public interface ISavedRecipeFiltersService {

	List<RecipeFilterDto> getUserFilters();
}
