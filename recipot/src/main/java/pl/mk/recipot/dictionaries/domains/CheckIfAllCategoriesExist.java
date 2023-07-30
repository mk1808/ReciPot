package pl.mk.recipot.dictionaries.domains;

import java.util.List;
import java.util.Set;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.Category;

public class CheckIfAllCategoriesExist {
	public void execute(List<Category> existingCategories, Set<Category> categories) {
		if (existingCategories.size() != categories.size()) {
			throw new ConflictException("dictionaries.error.categoryNotExists");
		}
	}
}
