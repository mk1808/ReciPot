package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

public class CheckIfUserIsOwner {

	public void execute(AppUser user, Recipe recipe) {
		if (!user.getId().equals(recipe.getOwner().getId())) {
			throw new ForbiddenException("recipes.error.userNotOwnerOfRecipe");
		}
	}
}
