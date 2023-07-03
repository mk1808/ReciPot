package pl.mk.recipot.recipecollections.facades;

import org.springframework.stereotype.Component;

import pl.mk.recipot.commons.models.AppUser;
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

}
