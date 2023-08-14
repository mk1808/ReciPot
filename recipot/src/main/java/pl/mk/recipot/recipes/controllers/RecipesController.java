package pl.mk.recipot.recipes.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.dtos.IngredientsFilterDto;
import pl.mk.recipot.recipes.dtos.RecipeFilterDto;
import pl.mk.recipot.recipes.helpers.RecipeSpecificationBuilder;
import pl.mk.recipot.recipes.services.IRecipesService;
import pl.mk.recipot.recipes.services.IShareRecipeService;

@RestController
public class RecipesController implements IRecipesController {

	private ICrudService<Recipe> recipeCrudService;
	private IFilterService<Recipe, RecipeSearchDto> recipeFilterService;
	private IRecipesService recipesService;
	private IShareRecipeService shareRecipeService;

	public RecipesController(ICrudService<Recipe> recipeCrudService, IRecipesService recipesService,
			IShareRecipeService shareRecipeService, IFilterService<Recipe, RecipeSearchDto> recipeFilterService) {
		super();
		this.recipeCrudService = recipeCrudService;
		this.recipesService = recipesService;
		this.shareRecipeService = shareRecipeService;
		this.recipeFilterService = recipeFilterService;
	}

	@Override
	public ResponseEntity<Response<Recipe>> create(Recipe recipe) {
		return new CreatedResponseFactory().createResponse(recipeCrudService.save(recipe));
	}

	@Override
	public ResponseEntity<Response<Void>> changeVisibility(UUID recipeId) {
		recipesService.changeVisibility(recipeId);
		return new OkMessageResponseFactory().createResponse("recipes.success.visibilityChanged");
	}

	@Override
	public ResponseEntity<Response<Recipe>> get(UUID id) {
		return new OkResponseFactory().createResponse(recipeCrudService.get(id));
	}

	@Override
	public ResponseEntity<Response<Recipe>> update(UUID id, Recipe recipe) {
		return new OkResponseFactory().createResponse(recipeCrudService.update(recipe, id));
	}

	@Override
	public ResponseEntity<Response<SharedRecipe>> shareWithUser(SharedRecipe sharedRecipe) {
		return new OkResponseFactory().createResponse(shareRecipeService.shareWithUser(sharedRecipe));
	}

	@Override
	public ResponseEntity<Response<Page<Recipe>>> search(int pageNum, int pageSize, RecipeSearchDto recipeSearchDto) {
		Page<Recipe> page = recipeFilterService.filter(recipeSearchDto.setPage(pageNum).setSize(pageSize));
		return new OkResponseFactory().createResponse(page);
	}

}
