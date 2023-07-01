package pl.mk.recipot.dictionaries.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;
import pl.mk.recipot.dictionaries.dtos.HashTagFilterDto;
import pl.mk.recipot.dictionaries.dtos.IngredientsFilterDto;
import pl.mk.recipot.dictionaries.services.IDictionariesService;

@RestController
public class DictionariesController implements IDictionariesController {

	private ICrudService<Category> categoryCrudService;
	private IDictionariesService dictionaryService;

	private ICrudService<HashTag> hashTagCrudService;
	private IFilterService<HashTag, HashTagFilterDto> hashTagFilterService;

	private ICrudService<Ingredient> ingredientsCrudService;
	private IFilterService<Ingredient, IngredientsFilterDto> ingredientsFilterService;

	public DictionariesController(ICrudService<Category> categoryCrudService, IDictionariesService dictionaryService,
			ICrudService<HashTag> hashTagCrudService, IFilterService<HashTag, HashTagFilterDto> hashTagFilterService,
			ICrudService<Ingredient> ingredientsCrudService,
			IFilterService<Ingredient, IngredientsFilterDto> ingredientsFilterService) {
		super();
		this.categoryCrudService = categoryCrudService;
		this.dictionaryService = dictionaryService;
		this.hashTagCrudService = hashTagCrudService;
		this.hashTagFilterService = hashTagFilterService;
		this.ingredientsCrudService = ingredientsCrudService;
		this.ingredientsFilterService = ingredientsFilterService;
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
	public ResponseEntity<Response<List<RecipeRequiredEffort>>> getAllRequiredEfforts() {
		return new OkResponseFactory().createResponse(dictionaryService.getAllRequiredEfforts());
	}

	@Override
	public List<RecipeDifficulty> getAllDifficulties() {
		return dictionaryService.getAllDifficulties();
	}

	@Override
	public Ingredient createIngredient(Ingredient ingredient) {
		return ingredientsCrudService.save(ingredient);
	}

	@Override
	public Page<Ingredient> getAllIngredients(String name, Integer page, Integer size) {
		return ingredientsFilterService.filter(new IngredientsFilterDto().setName(name).setPage(page).setSize(size));
	}

}
