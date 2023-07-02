package pl.mk.recipot.recipes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.services.ICrudService;

@RestController
public class RecipesController implements IRecipesController {

	private ICrudService<Recipe> recipeCrudService;

	public RecipesController(ICrudService<Recipe> recipeCrudService) {
		super();
		this.recipeCrudService = recipeCrudService;
	}

	@Override
	public ResponseEntity<Response<Recipe>> create(@RequestBody @Valid Recipe recipe) {
		return new CreatedResponseFactory().createResponse(recipeCrudService.save(recipe));
	}

}
