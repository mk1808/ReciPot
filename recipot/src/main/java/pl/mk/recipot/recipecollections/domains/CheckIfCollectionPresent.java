package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CheckIfCollectionPresent {
	public void execute(RecipeCollection recipeCollection) {
		if(recipeCollection==null) {
			throw new ConflictException("recipeCollections.error.collectionNotFound");
		}
	}

}
