package pl.mk.recipot.recipecollections.services;

import java.util.List;
import java.util.UUID;

import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public interface IRecipeCollectionsService {

	RecipeCollectionItem addItem(UUID collectionId, RecipeCollectionItem recipeCollectionItem);

	List<RecipeCollection> getForUser();

	void deleteRecipeFromCollection(UUID collectionId, UUID recipeId);

}
