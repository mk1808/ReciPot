package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

public class CheckIfUserIsNotOwner {

	public void execute(AppUser user, Recipe recipe) {
		boolean userIsOwner = user.getId().equals(recipe.getOwner().getId());
		if (!userIsOwner) {
			throw new ForbiddenException("recipes.error.userNotOwnerOfRecipe");
		}
	}
}
