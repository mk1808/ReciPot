package pl.mk.recipot.recipes.facades;

import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.services.ICrudService;

@Service
public class RecipesFacade implements IRecipesFacade {

	private ICrudService<Recipe> recipeCrudService;
	
	public RecipesFacade(ICrudService<Recipe> recipeCrudService) {
		super();
		this.recipeCrudService = recipeCrudService;
	}
	
	@Override
	public Recipe get(UUID id) {
		
		return recipeCrudService.get(id);
	}

}
