package pl.mk.recipot.recipecollections.domains;

import java.util.Objects;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CheckIfUserIsOwner {

	public void execute(RecipeCollection recipeCollection, AppUser user) {
		if (!Objects.equals(recipeCollection.getOwner().getId(), user.getId())) {
			throw new ForbiddenException("You dont have access to this collecation");
		}
	}
}
