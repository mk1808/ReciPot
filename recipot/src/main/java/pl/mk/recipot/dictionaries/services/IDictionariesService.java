package pl.mk.recipot.dictionaries.services;

import java.util.List;

import pl.mk.recipot.dictionaries.dtos.CategoryDto;

public interface IDictionariesService {

	public List<CategoryDto> getHierarchicalCategoriesList();
}
