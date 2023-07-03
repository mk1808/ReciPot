package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.SharedRecipe;

public class GetUserIsSharedRecipeOwner {
	public boolean execute(AppUser user, SharedRecipe sharedRecipe) {
		return user.getId().equals(sharedRecipe.getRecipe().getOwner().getId());
	}
}
