package pl.mk.recipot.recipecollections.facades;

import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

public interface IRecipeCollectionsFacade {
	void initUserDefaultCollections(AppUser user);

	void addRecipeToUserDefaultCollection(AppUser user, DefaultRecipeCollections recipeCollection, Recipe recipe);
	
	int getAllRecipeCollectionsCount();
}
