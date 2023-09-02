package pl.mk.recipot.dictionaries.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.enums.RecipeAmountOfDishes;
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
	public ResponseEntity<Response<Category>> createCategory(Category category) {
		return new OkResponseFactory().createResponse(categoryCrudService.save(category));
	}

	@Override
	public ResponseEntity<Response<List<CategoryDto>>> getAllCategories() {
		return new OkResponseFactory().createResponse(dictionaryService.getHierarchicalCategoriesList());
	}

	@Override
	public ResponseEntity<Response<HashTag>> createHashTag(HashTag hashTag) {
		return new OkResponseFactory().createResponse(hashTagCrudService.save(hashTag));
	}

	@Override
	public ResponseEntity<Response<Page<HashTag>>> getAllHashTags(String name, Integer page, Integer size) {
		return new OkResponseFactory().createResponse(
				hashTagFilterService.filter(new HashTagFilterDto().setName(name).setPage(page).setSize(size)));
	}

	@Override
	public ResponseEntity<Response<List<RecipeRequiredEffort>>> getAllRequiredEfforts() {
		return new OkResponseFactory().createResponse(dictionaryService.getAllRequiredEfforts());
	}

	@Override
	public ResponseEntity<Response<List<RecipeDifficulty>>> getAllDifficulties() {
		return new OkResponseFactory().createResponse(dictionaryService.getAllDifficulties());
	}

	@Override
	public ResponseEntity<Response<Ingredient>> createIngredient(Ingredient ingredient) {
		return new OkResponseFactory().createResponse(ingredientsCrudService.save(ingredient));
	}

	@Override
	public ResponseEntity<Response<Page<Ingredient>>> getAllIngredients(String name, Integer page, Integer size) {
		return new OkResponseFactory().createResponse(
				ingredientsFilterService.filter(new IngredientsFilterDto().setName(name).setPage(page).setSize(size)));
	}

	@Override
	public ResponseEntity<Response<List<RecipeAccessType>>> getAllAccessTypes() {
		return new OkResponseFactory().createResponse(dictionaryService.getAllAccessTypes());
	}

	@Override
	public ResponseEntity<Response<List<RecipeAmountOfDishes>>> getAllAmountOfDishes() {
		return new OkResponseFactory().createResponse(dictionaryService.getAllAmountOfDishes());
	}

}
