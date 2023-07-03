package pl.mk.recipot.recipes.facades;

import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipes.services.IRecipesService;

@Service
public class RecipesFacade implements IRecipesFacade {

	private ICrudService<Recipe> recipeCrudService;
	private IRecipesService recipesService;

	public RecipesFacade(ICrudService<Recipe> recipeCrudService, IRecipesService recipesService) {
		super();
		this.recipeCrudService = recipeCrudService;
		this.recipesService = recipesService;
	}
	
	@Override
	public Recipe get(UUID id) {
		
		return recipeCrudService.get(id);
	}

	@Override
	public int getAllRecipesCount() {
		return recipesService.getAllRecipesCount();
	}

}
