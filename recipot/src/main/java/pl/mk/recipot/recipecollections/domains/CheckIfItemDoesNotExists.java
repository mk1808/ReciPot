package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfItemDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("recipeCollections.error.recipeNotFoundInCollection");
	}
}
