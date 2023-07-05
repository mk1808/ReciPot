package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CheckIfUserIsNotOwner {

	public void execute(RecipeCollection recipeCollection, AppUser user) {
		boolean userIsOwner = recipeCollection.getOwner().getId().equals(user.getId());
		if (!userIsOwner) {
			throw new ForbiddenException("recipeCollections.error.userNotOwnerOfCollection");
		}
	}
}
