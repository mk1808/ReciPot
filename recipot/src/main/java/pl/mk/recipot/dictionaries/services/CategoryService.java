package pl.mk.recipot.dictionaries.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.domains.CheckIfAllCategoriesExist;
import pl.mk.recipot.dictionaries.domains.CheckIfCategoryDoesNotExists;
import pl.mk.recipot.dictionaries.domains.CheckIfCategoryExists;
import pl.mk.recipot.dictionaries.dtos.CategoriesFilterDto;
import pl.mk.recipot.dictionaries.repositories.ICategoryRepository;

@Service
public class CategoryService
		implements IFilterService<Category, CategoriesFilterDto>, ICrudService<Category>, ICategoryService {
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
		new CheckIfCategoryExists().execute(categoryRepository.findByName(category.getName()));
		return categoryRepository.save(category);
	}

	@Override
	public Category update(Category obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Category get(UUID id) {
		Category existingCategory = categoryRepository.findById(id).orElse(null);
		new CheckIfCategoryDoesNotExists().execute(existingCategory);
		return existingCategory;
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Set<Category> getCategories(Set<Category> categories) {
		List<UUID> ids = categories.stream().map(Category::getId).toList();
		List<Category> existingCategories = categoryRepository.findAllById(ids);
		new CheckIfAllCategoriesExist().execute(existingCategories, categories);

		return new HashSet<Category>(existingCategories);
	}

}
