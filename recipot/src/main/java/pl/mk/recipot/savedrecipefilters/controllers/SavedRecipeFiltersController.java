package pl.mk.recipot.savedrecipefilters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.models.RecipeFilter;
import pl.mk.recipot.commons.services.ICrudService;

@RestController
public class SavedRecipeFiltersController implements ISavedRecipeFiltersController {
	private ICrudService<RecipeFilter> recipeFiltersCrudService;

	public SavedRecipeFiltersController(ICrudService<RecipeFilter> recipeFiltersCrudService) {
		super();
		this.recipeFiltersCrudService = recipeFiltersCrudService;
	}

	@Override
	public ResponseEntity<Response<Void>> createRecipeFilter(RecipeFilter recipeFilter) {
		recipeFiltersCrudService.save(recipeFilter);
		return new CreatedResponseFactory().createResponse("Recipe filter saved");
	}

}
