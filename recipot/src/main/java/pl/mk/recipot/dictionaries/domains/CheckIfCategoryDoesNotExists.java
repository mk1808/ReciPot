package pl.mk.recipot.dictionaries.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfCategoryDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("dictionaries.error.categoryNotExists");
	}
}
