package pl.mk.recipot.recipes.controllers;

import org.springframework.web.bind.annotation.RestController;

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
	public Recipe create(Recipe recipe) {
		// TODO Auto-generated method stub
		return null;
	}

}
