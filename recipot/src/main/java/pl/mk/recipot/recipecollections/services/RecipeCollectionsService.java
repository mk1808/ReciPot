package pl.mk.recipot.recipecollections.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipecollections.domains.AddItemsToRecipeCollection;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionExists;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionNotNull;
import pl.mk.recipot.recipecollections.domains.CheckIfUserIsOwner;
import pl.mk.recipot.recipecollections.domains.CleanRecipeCollectionItems;
import pl.mk.recipot.recipecollections.domains.UpdateUserInRecipeCollection;
import pl.mk.recipot.recipecollections.repositories.IRecipeCollectionItemRepository;
import pl.mk.recipot.recipecollections.repositories.IRecipeCollectionsRepository;

@Service
public class RecipeCollectionsService implements IRecipeCollectionsService, ICrudService<RecipeCollection> {
	
	private IRecipeCollectionsRepository recipeCollectionsRepository;
	private IAuthFacade authFacade;
	private IRecipeCollectionItemRepository recipeCollectionItemRepository;
	
	public RecipeCollectionsService(IRecipeCollectionsRepository recipeCollectionsRepository, IAuthFacade authFacade,
			IRecipeCollectionItemRepository recipeCollectionItemRepository) {
		super();
		this.recipeCollectionsRepository = recipeCollectionsRepository;
		this.authFacade = authFacade;
		this.recipeCollectionItemRepository = recipeCollectionItemRepository;
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
		AppUser user = authFacade.getCurrentUser(); 
		RecipeCollection recipeCollection = recipeCollectionsRepository.getOwnById(id);
		new CheckIfCollectionNotNull().execute(recipeCollection);
		new CheckIfUserIsOwner().execute(recipeCollection, user);
		List<RecipeCollectionItem> items = recipeCollectionItemRepository.getByCollection(id);
		List<RecipeCollectionItem> cleanedItems = new CleanRecipeCollectionItems().execute(items);
		return new AddItemsToRecipeCollection().execute(cleanedItems, recipeCollection);
	}

	@Override
	public void delete(UUID id) {
		// TODO Auto-generated method stub
		
	}

}
