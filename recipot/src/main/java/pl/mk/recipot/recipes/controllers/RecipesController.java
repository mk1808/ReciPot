package pl.mk.recipot.recipes.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipes.services.IRecipesService;
import pl.mk.recipot.recipes.services.IShareRecipeService;

@RestController
public class RecipesController implements IRecipesController {

	private ICrudService<Recipe> recipeCrudService;
	private IRecipesService recipesService;
	private IShareRecipeService shareRecipeService;

	public RecipesController(ICrudService<Recipe> recipeCrudService, IRecipesService recipesService, IShareRecipeService shareRecipeService) {
		super();
		this.recipeCrudService = recipeCrudService;
		this.recipesService = recipesService;
		this.shareRecipeService = shareRecipeService;
	}

	@Override
	public ResponseEntity<Response<Recipe>> create(Recipe recipe) {
		return new CreatedResponseFactory().createResponse(recipeCrudService.save(recipe));
	}

	@Override
	public ResponseEntity<Response<Void>> changeVisibility(UUID recipeId) {
		recipesService.changeVisibility(recipeId);
		return new OkMessageResponseFactory().createResponse("Recipe visibility changed");
  }
  
  @Override
	public ResponseEntity<Response<Recipe>> get(UUID id) {
		return new OkResponseFactory().createResponse(recipeCrudService.get(id));
	}

	@Override
	public ResponseEntity<Response<SharedRecipe>> shareWithUser(@Valid SharedRecipe sharedRecipe) {
		return new OkResponseFactory().createResponse(shareRecipeService.shareWithUser(sharedRecipe));
	}

}
