package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CheckIfUserIsOwner {
	public void execute(RecipeCollection recipeCollection, AppUser user) {
		if(!recipeCollection.getOwner().getId().equals(user.getId())) {
			throw new ForbiddenException("User cant access this collection");
		}
	}
}
