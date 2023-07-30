package pl.mk.recipot.dictionaries.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.Category;

public class CheckIfCategoryDoesNotExists {
	public void execute(Category category) {
		if (category == null) {
			throw new ConflictException("dictionaries.error.categoryNotExists");
		}
	}
}
