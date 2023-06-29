package pl.mk.recipot.dictionaries.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;
import pl.mk.recipot.dictionaries.services.IDictionariesService;

@RestController
public class DictionariesController implements IDictionariesController {

	private ICrudService<Category> categoryCrudService;
	private IDictionariesService dictionaryService;

	public DictionariesController(ICrudService<Category> categoryCrudService, IDictionariesService dictionaryService) {
		super();
		this.categoryCrudService = categoryCrudService;
		this.dictionaryService = dictionaryService;
	}

	@Override
	public Category createCategory(Category category) {
		return categoryCrudService.save(category);
	}

	@Override
	public List<CategoryDto> getAllCategories() {
		return dictionaryService.getHierarchicalCategoriesList();
	}

	@Override
	public List<RecipeRequiredEffort> getAllRequiredEfforts() {
		return dictionaryService.getAllRequiredEfforts();
	}

}
