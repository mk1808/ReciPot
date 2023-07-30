package pl.mk.recipot.recipecollections.domains;

import java.util.List;

import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class UpdateItemsInRecipeCollection {
	public RecipeCollection execute(List<RecipeCollectionItem> items, RecipeCollection recipeCollection) {
		recipeCollection.setRecipeCollectionItems(items);
		return recipeCollection;
	}
}
