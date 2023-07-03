package pl.mk.recipot.recipecollections.services;

import java.util.List;
import java.util.UUID;

import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public interface IRecipeCollectionsService {

	RecipeCollectionItem addItem(UUID collectionId, RecipeCollectionItem recipeCollectionItem);

	List<RecipeCollection> getForUser();

	void deleteRecipeFromCollection(UUID collectionId, UUID recipeId);

	void initUserDefaultCollections(AppUser user);

	void addRecipeToUserDefaultCollection(AppUser user, DefaultRecipeCollections recipeCollection, Recipe recipe);
	
	int getAllRecipeCollectionsCount();
	
	int getUserRecipeCollectionsCount(AppUser user);

	int getRecipesInUserRecipeCollectionsCount(AppUser user);
}
