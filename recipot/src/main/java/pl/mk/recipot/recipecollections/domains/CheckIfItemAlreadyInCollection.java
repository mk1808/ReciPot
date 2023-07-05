package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class CheckIfItemAlreadyInCollection {
	public void execute(RecipeCollectionItem existingItem) {

		if (existingItem != null) {
			throw new ConflictException("recipeCollections.error.recipeExistsInCollection");
		}
	}
}
