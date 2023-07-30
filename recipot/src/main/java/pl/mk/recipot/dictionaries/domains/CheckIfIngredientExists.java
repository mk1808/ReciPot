package pl.mk.recipot.dictionaries.domains;

import pl.mk.recipot.commons.domains.CheckIfCollectionNotEmpty;
import pl.mk.recipot.commons.exceptions.ConflictException;

public class CheckIfIngredientExists extends CheckIfCollectionNotEmpty {

	@Override
	protected RuntimeException getException() {
		return new ConflictException("dictionaries.error.ingredientExists");
	}
}
