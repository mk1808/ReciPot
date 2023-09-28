package pl.mk.recipot.recipecollections.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.domains.SetUserNull;
import pl.mk.recipot.commons.domains.SetUserValue;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionDoesNotExists;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionExists;
import pl.mk.recipot.recipecollections.domains.CheckIfCollectionNotFound;
import pl.mk.recipot.recipecollections.domains.CheckIfDeleteIsPossible;
import pl.mk.recipot.recipecollections.domains.CheckIfItemAlreadyInCollection;
import pl.mk.recipot.recipecollections.domains.CheckIfItemDoesNotExists;
import pl.mk.recipot.recipecollections.domains.CleanRecipeCollectionItem;
import pl.mk.recipot.recipecollections.domains.CleanRecipeCollectionItems;
import pl.mk.recipot.recipecollections.domains.CreateDefaultRecipeCollections;
import pl.mk.recipot.recipecollections.domains.UpdateItemsInRecipeCollection;
import pl.mk.recipot.recipecollections.domains.UpdateRecipeCollectionItem;
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
			IRecipesFacade recipesFacade, IRecipeCollectionsItemRepository recipeCollectionsItemRepository) {
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
		recipeCollection = new SetUserValue().execute(recipeCollection, user);
		return new SetUserNull().execute(recipeCollectionsRepository.save(recipeCollection));
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
		new CheckIfUserIsNotOwner().execute(user, recipeCollection);
		List<RecipeCollectionItem> items = recipeCollectionsItemRepository.getByCollection(id);
		List<RecipeCollectionItem> cleanedItems = new CleanRecipeCollectionItems().execute(items);
		return new UpdateItemsInRecipeCollection().execute(cleanedItems, recipeCollection);
	}

	@Override
	public void delete(UUID id) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection recipeCollection = recipeCollectionsRepository.getById(id);
		new CheckIfCollectionNotFound().execute(recipeCollection);
		new CheckIfUserIsNotOwner().execute(user, recipeCollection);
		new CheckIfDeleteIsPossible().execute(recipeCollection);

		List<RecipeCollectionItem> items = recipeCollectionsItemRepository.getByCollection(id);
		items.forEach(item -> recipeCollectionsItemRepository.delete(item));
		recipeCollectionsRepository.delete(recipeCollection);
	}

	@Override
	public RecipeCollectionItem addItem(UUID collectionId, RecipeCollectionItem recipeCollectionItem) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository.getById(collectionId);
		new CheckIfCollectionNotFound().execute(existingRecipeCollection);
		new CheckIfUserIsNotOwner().execute(user, existingRecipeCollection);
		Recipe recipe = recipesFacade.get(recipeCollectionItem.getRecipe().getId());
		RecipeCollectionItem existingItem = recipeCollectionsItemRepository
				.getByRecipeAndCollection(existingRecipeCollection.getId(), recipe.getId());
		new CheckIfItemAlreadyInCollection().execute(existingItem);

		RecipeCollectionItem newItem = new UpdateRecipeCollectionItem().execute(recipeCollectionItem, recipe,
				existingRecipeCollection);
		RecipeCollectionItem saved = recipeCollectionsItemRepository.save(newItem);
		return new CleanRecipeCollectionItem().execute(saved);

	}

	@Override
	public List<RecipeCollection> getForUser() {
		List<RecipeCollection> recipeCollections = recipeCollectionsRepository.getByOwner(authFacade.getCurrentUser());
		recipeCollections.forEach(new SetUserNull()::execute);
		return recipeCollections;
	}

	@Override
	public void deleteRecipeFromCollection(UUID collectionId, UUID recipeId) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository.getById(collectionId);
		new CheckIfCollectionNotFound().execute(existingRecipeCollection);
		new CheckIfUserIsNotOwner().execute(user, existingRecipeCollection);
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
			RecipeCollectionItem newItem = new UpdateRecipeCollectionItem().execute(new RecipeCollectionItem(), recipe,
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

	@Override
	public Page<RecipeCollectionItem> findPageByCollection(UUID collectionId, Pageable pageRequest) {
		Page<RecipeCollectionItem> recipesPage = recipeCollectionsItemRepository.findPageByCollection(collectionId, pageRequest);
		recipesPage.forEach(new CleanRecipeCollectionItem()::execute);
		return recipesPage;
	}

	@Override
	public void deleteRecipeFromCollection(Recipe recipe) {
		List<RecipeCollectionItem> existingItems = recipeCollectionsItemRepository.getByRecipe(recipe.getId());
		recipeCollectionsItemRepository.deleteAll(existingItems);
	}

	@Override
	public RecipeCollection getUserCollectionByName(String name) {
		AppUser user = authFacade.getCurrentUser();
		RecipeCollection existingRecipeCollection = recipeCollectionsRepository.getOwnByNameAndUser(name, user.getId());
		new CheckIfCollectionNotFound().execute(existingRecipeCollection);
		List<RecipeCollectionItem> recipesList = recipeCollectionsItemRepository.getByCollection(existingRecipeCollection.getId());
		recipesList.forEach(new CleanRecipeCollectionItem()::execute);
		existingRecipeCollection.setRecipeCollectionItems(recipesList);
		return existingRecipeCollection;
	}

}
