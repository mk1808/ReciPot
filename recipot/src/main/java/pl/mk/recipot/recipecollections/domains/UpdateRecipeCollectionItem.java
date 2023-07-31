package pl.mk.recipot.recipecollections.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class UpdateRecipeCollectionItem {
	public RecipeCollectionItem execute(RecipeCollectionItem recipeCollectionItem, Recipe recipe,
			RecipeCollection recipeCollection) {
		return RecipeCollectionItem.builder()
				.collection(recipeCollection)
				.created(new Date())
				.recipe(recipe)
				.build();
	}
}
