package pl.mk.recipot.dictionaries.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.dtos.CategoriesFilterDto;
import pl.mk.recipot.dictionaries.repositories.ICategoryRepository;

@Service
public class CategoryService implements IFilterService<Category, CategoriesFilterDto>, ICrudService<Category> {
	private ICategoryRepository categoryRepository;

	public CategoryService(ICategoryRepository categoryRepository) {
		super();
		this.categoryRepository = categoryRepository;
	}

	@Override
	public Page<Category> filter(CategoriesFilterDto filterObject) {
		return categoryRepository.findAll(filterObject.getPageable());
	}

	@Override
	public Category save(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public Category update(Category obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Category get(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

}
