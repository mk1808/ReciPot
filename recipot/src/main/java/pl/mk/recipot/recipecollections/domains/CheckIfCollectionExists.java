package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.domains.CheckIfNotNull;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfCollectionExists extends CheckIfNotNull {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("recipeCollections.error.collectionForUserExists");
	}
}
