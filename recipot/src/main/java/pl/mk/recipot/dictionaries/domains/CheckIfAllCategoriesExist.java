package pl.mk.recipot.dictionaries.domains;

import pl.mk.recipot.commons.domains.CheckIfCollectionsNotEquals;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfAllCategoriesExist extends CheckIfCollectionsNotEquals {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("dictionaries.error.categoryNotExists");
	}
}
