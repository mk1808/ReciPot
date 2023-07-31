package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.NotFoundException;

public class CheckIfCollectionDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new NotFoundException("recipeCollections.error.collectionNotExists");
	}
}
