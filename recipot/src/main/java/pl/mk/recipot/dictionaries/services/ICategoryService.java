package pl.mk.recipot.dictionaries.services;

import java.util.Set;

import pl.mk.recipot.commons.models.Category;

public interface ICategoryService {
	
	Set<Category> getCategories(Set<Category> categories);

}
