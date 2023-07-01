package pl.mk.recipot.dictionaries.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.domains.CreateHierarchicalCategoriesList;
import pl.mk.recipot.dictionaries.dtos.CategoriesFilterDto;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;
import pl.mk.recipot.dictionaries.repositories.ICategoryRepository;

@Service
@Qualifier("dictionariesService")
public class DictionariesService
		implements IDictionariesService, IFilterService<Category, CategoriesFilterDto>, ICrudService<Category> {
	private ICategoryRepository categoryRepostory;

	public DictionariesService(ICategoryRepository categoryRepostory) {
		super();
		this.categoryRepostory = categoryRepostory;
	}

	@Override
	public Page<Category> filter(CategoriesFilterDto filterObject) {
		return categoryRepostory.findAll(PageRequest.of(filterObject.page, filterObject.size));
	}

	@Override
	public Category save(Category category) {
		return categoryRepostory.save(category);
	}

	@Override
	public Category update(Category obj, Long id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Category get(Long id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(Long id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public List<CategoryDto> getHierarchicalCategoriesList() {
		return new CreateHierarchicalCategoriesList().execute(filter(new CategoriesFilterDto()).getContent());
	}

	@Override
	public List<RecipeDifficulty> getAllDifficulties() {
		return Arrays.asList(RecipeDifficulty.values());
	}

}
