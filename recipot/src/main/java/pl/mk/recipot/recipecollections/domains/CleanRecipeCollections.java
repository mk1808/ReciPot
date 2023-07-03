package pl.mk.recipot.recipecollections.domains;

import java.util.List;

import pl.mk.recipot.commons.models.RecipeCollection;

public class CleanRecipeCollections {
	public List<RecipeCollection> execute(List<RecipeCollection> recipeCollections) {
		recipeCollections.forEach(collection->collection.setOwner(null));
		return recipeCollections;
	}
}
