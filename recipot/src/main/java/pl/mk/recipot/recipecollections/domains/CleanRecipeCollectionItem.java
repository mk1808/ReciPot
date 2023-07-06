package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class CleanRecipeCollectionItem {
	public RecipeCollectionItem execute(RecipeCollectionItem item) {
		item.getCollection().setOwner(null);
		item.getRecipe().setOwner(null);
		return item;

	}

}
