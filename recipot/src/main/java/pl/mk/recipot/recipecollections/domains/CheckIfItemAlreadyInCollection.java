package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.domains.CheckIfNotNull;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfItemAlreadyInCollection extends CheckIfNotNull {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("recipeCollections.error.recipeExistsInCollection");
	}
}
