package pl.mk.recipot.savedrecipefilters.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.RecipeFilter;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.savedrecipefilters.services.ISavedRecipeFiltersService;

@RestController
public class SavedRecipeFiltersController implements ISavedRecipeFiltersController {
	private ICrudService<RecipeFilter> recipeFiltersCrudService;
	private ISavedRecipeFiltersService savedRecipeFiltersService;

	public SavedRecipeFiltersController(ICrudService<RecipeFilter> recipeFiltersCrudService,
			ISavedRecipeFiltersService savedRecipeFiltersService) {
		super();
		this.recipeFiltersCrudService = recipeFiltersCrudService;
		this.savedRecipeFiltersService = savedRecipeFiltersService;
	}

	@Override
	public ResponseEntity<Response<RecipeFilter>> createRecipeFilter(RecipeFilter recipeFilter) {
		return new CreatedResponseFactory().createResponse(recipeFiltersCrudService.save(recipeFilter));
	}

	@Override
	public ResponseEntity<Response<List<RecipeFilter>>> getRecipeFilters() {
		return new OkResponseFactory().createResponse(savedRecipeFiltersService.getUserFilters());
	}

	@Override
	public ResponseEntity<Response<Void>> deleteRecipeFilter(UUID recipeFilterId) {
		recipeFiltersCrudService.delete(recipeFilterId);
		return new OkMessageResponseFactory().createResponse("savedRecipeFilters.success.savedRecipeFilterDeleted");
	}

}
