package pl.mk.recipot.recipecollections.domains;

import java.util.List;

import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class CleanRecipeCollectionItems {
	public List<RecipeCollectionItem> execute(List<RecipeCollectionItem> items) {
		items.forEach(item -> item.setRecipe(null));
		return items;
	}
}
