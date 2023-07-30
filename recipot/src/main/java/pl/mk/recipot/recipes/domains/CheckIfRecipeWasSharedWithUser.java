package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.domains.CheckIfCollectionNotEmpty;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfRecipeWasSharedWithUser extends CheckIfCollectionNotEmpty {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("recipes.error.recipeAlreadyShared");
	}
}
