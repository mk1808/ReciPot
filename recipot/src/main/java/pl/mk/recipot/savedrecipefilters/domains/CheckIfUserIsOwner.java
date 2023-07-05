package pl.mk.recipot.savedrecipefilters.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeFilter;

public class CheckIfUserIsOwner {
	public void execute(AppUser user, RecipeFilter recipeFilter) {
		if (!user.getId().equals(recipeFilter.getOwner().getId())) {
			throw new ForbiddenException("savedRecipeFilters.error.userNotOwnerOfRecipeFilter");
		}
	}
}
