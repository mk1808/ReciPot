package pl.mk.recipot.recipes.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.facades.IDictionariesFacade;
import pl.mk.recipot.dictionaries.repositories.IHashTagRepository;
import pl.mk.recipot.recipes.domains.UpdateListsInRecipe;
import pl.mk.recipot.recipes.dtos.RecipeFilterDto;
import pl.mk.recipot.recipes.repositories.IRecipesRepository;

@Service
public class RecipesService implements IRecipesService, ICrudService<Recipe>, IFilterService<Recipe, RecipeFilterDto>{
	
	private IRecipesRepository recipesRepository;
	private IDictionariesFacade dictionariesFacade;
	
	

	public RecipesService(IRecipesRepository recipesRepository, IDictionariesFacade dictionariesFacade) {
		super();
		this.recipesRepository = recipesRepository;
		this.dictionariesFacade = dictionariesFacade;
	}

	@Override
	public Page<Recipe> filter(RecipeFilterDto filterObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Recipe save(Recipe recipe) {
		Set<HashTag> tags = dictionariesFacade.saveManyHashTags(recipe.getHashTags());
		Set<Category> categories = dictionariesFacade.getCategories(recipe.getCategories());
		
		Recipe updatedRecipe = new UpdateListsInRecipe().execute(recipe, tags, categories);
		return recipesRepository.save(updatedRecipe);
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
