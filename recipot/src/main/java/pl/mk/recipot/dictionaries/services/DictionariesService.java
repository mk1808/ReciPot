package pl.mk.recipot.dictionaries.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.domains.CreateHierarchicalCategoriesList;
import pl.mk.recipot.dictionaries.dtos.CategoriesFilterDto;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;

@Service
@Qualifier("dictionariesService")
public class DictionariesService implements IDictionariesService {
	private IFilterService<Category, CategoriesFilterDto> categoryFilterService;

	public DictionariesService(IFilterService<Category, CategoriesFilterDto> categoryFilterService) {
		super();
		this.categoryFilterService = categoryFilterService;
	}

	@Override
	public List<CategoryDto> getHierarchicalCategoriesList() {
		return new CreateHierarchicalCategoriesList()
				.execute(categoryFilterService.filter(new CategoriesFilterDto()).getContent());
	}

}
