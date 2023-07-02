package pl.mk.recipot.recipes.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.recipes.dtos.RecipeFilterDto;

@Service
public class RecipesService implements IRecipesService, ICrudService<Recipe>, IFilterService<Recipe, RecipeFilterDto>{

	@Override
	public Page<Recipe> filter(RecipeFilterDto filterObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Recipe save(Recipe obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Recipe update(Recipe obj, UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Recipe get(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(UUID id) {
		// TODO Auto-generated method stub
		
	}

}
