package pl.mk.recipot.recipecollections.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionExists;
import pl.mk.recipot.recipecollections.domains.UpdateUserInRecipeCollection;
import pl.mk.recipot.recipecollections.repositories.IRecipeCollectionsRepository;
import pl.mk.recipot.recipes.domains.UpdateUserInRecipe;
import pl.mk.recipot.recipes.repositories.IRecipesRepository;

@Service
public class RecipeCollectionsService implements IRecipeCollectionsService, ICrudService<RecipeCollection> {
	
	private IRecipeCollectionsRepository recipeCollectionsRepository;
	private IAuthFacade authFacade;
	
	public RecipeCollectionsService(IRecipeCollectionsRepository recipeCollectionsRepository, IAuthFacade authFacade) {
		super();
		this.recipeCollectionsRepository = recipeCollectionsRepository;
		this.authFacade = authFacade;
	}

	@Override
	public RecipeCollection save(RecipeCollection recipeCollection) {
		AppUser user = authFacade.getCurrentUser(); 
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository.getOwnByNameAndUser(recipeCollection.getName(), user.getId());
		new CheckIfCollectionExists().execute(existingRecipeCollection);
		recipeCollection = new UpdateUserInRecipeCollection().execute(recipeCollection, user);
		return recipeCollectionsRepository.save(recipeCollection);
	}

	@Override
	public RecipeCollection update(RecipeCollection obj, UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RecipeCollection get(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(UUID id) {
		// TODO Auto-generated method stub
		
	}

}
