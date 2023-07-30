package pl.mk.recipot.savedrecipefilters.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.NotFoundException;

public class CheckIfRecipeFilterDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new NotFoundException("savedRecipeFilters.error.savedRecipeFilterNotFound");
	}
}
