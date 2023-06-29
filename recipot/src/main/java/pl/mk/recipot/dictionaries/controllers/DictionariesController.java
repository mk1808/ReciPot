package pl.mk.recipot.dictionaries.controllers;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.dtos.CategoriesFilterDto;

@RestController
public class DictionariesController implements IDictionariesController {

	private ICrudService<Category> categoryCrudService;
	private IFilterService<Category, CategoriesFilterDto> categoriesFilterService;

	public DictionariesController(ICrudService<Category> categoryCrudService,
			IFilterService<Category, CategoriesFilterDto> categoriesFilterService) {
		super();
		this.categoryCrudService = categoryCrudService;
		this.categoriesFilterService = categoriesFilterService;
	}

	@Override
	public Category createCategory(Category category) {
		return categoryCrudService.save(category);
	}

	@Override
	public Page<Category> getAllCategories(CategoriesFilterDto filterDto) {
		return categoriesFilterService.filter(filterDto);
	}

}
