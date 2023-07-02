package pl.mk.recipot.savedrecipefilters.domains;

import java.util.List;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.RecipeFilter;

public class CheckIfRecipeFilterExists {
	public void execute(List<RecipeFilter> filters) {
		if (!filters.isEmpty()) {
			throw new ConflictException("User filter with that name already exists");
		}
	}
}
