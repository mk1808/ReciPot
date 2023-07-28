package pl.mk.recipot.recipecollections.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipecollections.domains.AddItemsToRecipeCollection;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionExists;
import pl.mk.recipot.recipecollections.domains.CheckIfDeleteIsPossible;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionDoesNotExists;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionDoesNotFound;
import pl.mk.recipot.recipecollections.domains.CheckIfItemAlreadyInCollection;
import pl.mk.recipot.recipecollections.domains.CheckIfItemDoesNotExists;
import pl.mk.recipot.recipecollections.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.recipecollections.domains.CleanRecipeCollections;
import pl.mk.recipot.recipecollections.domains.CleanRecipeCollectionItem;
import pl.mk.recipot.recipecollections.domains.CleanRecipeCollectionItems;
import pl.mk.recipot.recipecollections.domains.CreateDefaultRecipeCollections;
import pl.mk.recipot.recipecollections.domains.FillRecipeCollectionItem;
import pl.mk.recipot.recipecollections.domains.UpdateUserInRecipeCollection;
import pl.mk.recipot.recipecollections.repositories.IRecipeCollectionsItemRepository;
import pl.mk.recipot.recipecollections.repositories.IRecipeCollectionsRepository;
import pl.mk.recipot.recipes.facades.IRecipesFacade;

@Service
public class RecipeCollectionsService implements IRecipeCollectionsService, ICrudService<RecipeCollection> {

	private IRecipeCollectionsRepository recipeCollectionsRepository;
	private IRecipeCollectionsItemRepository recipeCollectionsItemRepository;
	private IAuthFacade authFacade;
	private IRecipesFacade recipesFacade;

	public RecipeCollectionsService(IRecipeCollectionsRepository recipeCollectionsRepository, IAuthFacade authFacade,
			IRecipesFacade recipesFacade,
			IRecipeCollectionsItemRepository recipeCollectionsItemRepository) {
		super();
		this.recipeCollectionsRepository = recipeCollectionsRepository;
		this.authFacade = authFacade;
		this.recipesFacade = recipesFacade;
		this.recipeCollectionsItemRepository = recipeCollectionsItemRepository;

	}

	@Override
	public RecipeCollection save(RecipeCollection recipeCollection) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository
				.getOwnByNameAndUser(recipeCollection.getName(), user.getId());
		new CheckIfCollectionExists().execute(existingRecipeCollection);
		recipeCollection = new UpdateUserInRecipeCollection().execute(recipeCollection, user);
		
		return new CleanRecipeCollections().execute(Arrays.asList(recipeCollectionsRepository.save(recipeCollection))).get(0);
	}

	@Override
	public RecipeCollection update(RecipeCollection obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public RecipeCollection get(UUID id) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection recipeCollection = recipeCollectionsRepository.getOwnById(id);
		new CheckIfCollectionDoesNotExists().execute(recipeCollection);
		new CheckIfUserIsNotOwner().execute(recipeCollection, user);
		List<RecipeCollectionItem> items = recipeCollectionsItemRepository.getByCollection(id);
		List<RecipeCollectionItem> cleanedItems = new CleanRecipeCollectionItems().execute(items);
		return new AddItemsToRecipeCollection().execute(cleanedItems, recipeCollection);
	}

	@Override
	public void delete(UUID id) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection recipeCollection = recipeCollectionsRepository.getById(id);
		new CheckIfCollectionDoesNotFound().execute(recipeCollection);
		new CheckIfUserIsNotOwner().execute(recipeCollection, user);
		new CheckIfDeleteIsPossible().execute(recipeCollection);

		List<RecipeCollectionItem> items = recipeCollectionsItemRepository.getByCollection(id);
		items.forEach(item -> recipeCollectionsItemRepository.delete(item));
		recipeCollectionsRepository.delete(recipeCollection);
	}

	@Override
	public RecipeCollectionItem addItem(UUID collectionId, RecipeCollectionItem recipeCollectionItem) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository.getById(collectionId);
		new CheckIfCollectionDoesNotFound().execute(existingRecipeCollection);
		new CheckIfUserIsNotOwner().execute(existingRecipeCollection, user);
		Recipe recipe = recipesFacade.get(recipeCollectionItem.getRecipe().getId());
		RecipeCollectionItem existingItem = recipeCollectionsItemRepository
				.getByRecipeAndCollection(existingRecipeCollection.getId(), recipe.getId());
		new CheckIfItemAlreadyInCollection().execute(existingItem);

		RecipeCollectionItem newItem = new FillRecipeCollectionItem().execute(recipeCollectionItem, recipe,
				existingRecipeCollection);
		RecipeCollectionItem saved = recipeCollectionsItemRepository.save(newItem);
		return new CleanRecipeCollectionItem().execute(saved);

	}

	@Override
	public List<RecipeCollection> getForUser() {

		List<RecipeCollection> recipeCollections = recipeCollectionsRepository.getByOwner(authFacade.getCurrentUser());
		return new CleanRecipeCollections().execute(recipeCollections);
	}

	@Override
	public void deleteRecipeFromCollection(UUID collectionId, UUID recipeId) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository.getById(collectionId);
		new CheckIfCollectionDoesNotFound().execute(existingRecipeCollection);
		new CheckIfUserIsNotOwner().execute(existingRecipeCollection, user);
		new CheckIfDeleteIsPossible().execute(existingRecipeCollection);

		RecipeCollectionItem existingItem = recipeCollectionsItemRepository.getByRecipeAndCollection(collectionId,
				recipeId);
		new CheckIfItemDoesNotExists().execute(existingItem);

		recipeCollectionsItemRepository.delete(existingItem);

	}

	@Override
	public void initUserDefaultCollections(AppUser user) {
		recipeCollectionsRepository.saveAll(new CreateDefaultRecipeCollections().execute(user));
	}

	@Override
	public void addRecipeToUserDefaultCollection(AppUser user, DefaultRecipeCollections recipeCollection,
			Recipe recipe) {
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository
				.getOwnByNameAndUser(recipeCollection.getName(), user.getId());
		RecipeCollectionItem existingItem = recipeCollectionsItemRepository
				.getByRecipeAndCollection(existingRecipeCollection.getId(), recipe.getId());
		if (existingItem == null) {
			RecipeCollectionItem newItem = new FillRecipeCollectionItem().execute(new RecipeCollectionItem(), recipe,
					existingRecipeCollection);
			recipeCollectionsItemRepository.save(newItem);
		}

	}

	@Override
	public int getAllRecipeCollectionsCount() {
		return recipeCollectionsRepository.getAllRecipeCollectionsCount();
	}

	@Override
	public int getUserRecipeCollectionsCount(AppUser user) {
		return recipeCollectionsRepository.getUserRecipeCollectionsCount(user);
	}

	@Override
	public int getRecipesInUserRecipeCollectionsCount(AppUser user) {
		return recipeCollectionsItemRepository.getRecipesInUserRecipeCollectionsCount(user);
	}

}
