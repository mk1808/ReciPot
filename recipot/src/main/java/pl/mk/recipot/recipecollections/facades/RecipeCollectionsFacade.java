package pl.mk.recipot.recipecollections.facades;

import org.springframework.stereotype.Component;

import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.recipecollections.services.IRecipeCollectionsService;

@Component
public class RecipeCollectionsFacade implements IRecipeCollectionsFacade {
	private IRecipeCollectionsService recipeCollectionsService;

	public RecipeCollectionsFacade(IRecipeCollectionsService recipeCollectionsService) {
		super();
		this.recipeCollectionsService = recipeCollectionsService;
	}

	@Override
	public void initUserDefaultCollections(AppUser user) {
		recipeCollectionsService.initUserDefaultCollections(user);
	}

	@Override
	public void addRecipeToUserDefaultCollection(AppUser user, DefaultRecipeCollections recipeCollection,
			Recipe recipe) {
		recipeCollectionsService.addRecipeToUserDefaultCollection(user, recipeCollection, recipe);
	}

	@Override
	public int getAllRecipeCollectionsCount() {
		return recipeCollectionsService.getAllRecipeCollectionsCount();
	}

	@Override
	public int getUserRecipeCollectionsCount(AppUser user) {
		return recipeCollectionsService.getUserRecipeCollectionsCount(user);
	}

	@Override
	public int getRecipesInUserRecipeCollectionsCount(AppUser user) {
		return recipeCollectionsService.getRecipesInUserRecipeCollectionsCount(user);
	}

}
