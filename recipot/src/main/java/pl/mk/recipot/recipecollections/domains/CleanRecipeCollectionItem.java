package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.domains.SetUserNull;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class CleanRecipeCollectionItem {
	public RecipeCollectionItem execute(RecipeCollectionItem item) {
		SetUserNull cleaner = new SetUserNull();
		cleaner.execute(item.getCollection());
		cleaner.execute(item.getRecipe());
		return item;

	}

}
