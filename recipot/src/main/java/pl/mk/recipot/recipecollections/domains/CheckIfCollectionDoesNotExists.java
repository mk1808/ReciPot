package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CheckIfCollectionDoesNotExists {
	public void execute(RecipeCollection recipeCollection) {
		if (recipeCollection == null) {
			throw new NotFoundException("recipeCollections.error.collectionNotExists");
		}
	}
}