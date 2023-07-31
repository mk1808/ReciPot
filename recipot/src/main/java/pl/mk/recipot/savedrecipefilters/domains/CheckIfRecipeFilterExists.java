package pl.mk.recipot.savedrecipefilters.domains;

import pl.mk.recipot.commons.domains.CheckIfCollectionNotEmpty;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfRecipeFilterExists extends CheckIfCollectionNotEmpty {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("savedRecipeFilters.error.savedRecipeFilterExists");
	}
}
