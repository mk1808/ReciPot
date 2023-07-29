package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class CheckIfItemDoesNotExists {
	public void execute(RecipeCollectionItem item ) {
		
		if(item==null) {
			throw new ConflictException("recipeCollections.error.recipeNotFoundInCollection");
		}
	}
}