package pl.mk.recipot.dictionaries.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;
import pl.mk.recipot.dictionaries.dtos.HashTagFilterDto;
import pl.mk.recipot.dictionaries.services.IDictionariesService;

@RestController
public class DictionariesController implements IDictionariesController {

	private ICrudService<Category> categoryCrudService;
	private IDictionariesService dictionaryService;

	private ICrudService<HashTag> hashTagCrudService;
	private IFilterService<HashTag, HashTagFilterDto> hashTagFilterService;

	public DictionariesController(ICrudService<Category> categoryCrudService, IDictionariesService dictionaryService,
			ICrudService<HashTag> hashTagCrudService, IFilterService<HashTag, HashTagFilterDto> hashTagFilterService) {
		super();
		this.categoryCrudService = categoryCrudService;
		this.dictionaryService = dictionaryService;
		this.hashTagCrudService = hashTagCrudService;
		this.hashTagFilterService = hashTagFilterService;
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
	public HashTag createHashTag(HashTag hashTag) {
		return hashTagCrudService.save(hashTag);
	}

	@Override
	public Page<HashTag> getAllHashTags(String name, Integer page, Integer size) {
		return hashTagFilterService.filter(new HashTagFilterDto().setName(name).setPage(page).setSize(size));
  }
  
  @Override
  public List<RecipeRequiredEffort> getAllRequiredEfforts() {
		return dictionaryService.getAllRequiredEfforts();
  }
  
  @Override
	public List<RecipeDifficulty> getAllDifficulties() {
		return dictionaryService.getAllDifficulties();
	}

}
