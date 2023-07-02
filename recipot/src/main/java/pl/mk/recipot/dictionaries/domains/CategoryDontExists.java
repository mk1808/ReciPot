package pl.mk.recipot.dictionaries.domains;

import java.util.List;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.Category;

public class CategoryDontExists {
	public void execute(List<Category> category) {
		if (!category.isEmpty()) {
			throw new ConflictException("Created category exists");
		}
	}
}
