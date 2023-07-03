package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.SharedRecipe;

public class CheckIfUserIsSharedRecipeOwner {
	public void execute(AppUser user, SharedRecipe sharedRecipe) {
		if (new GetUserIsSharedRecipeOwner().execute(user, sharedRecipe)) {
			throw new ConflictException("User is recipe owner");
		}
	}
}
