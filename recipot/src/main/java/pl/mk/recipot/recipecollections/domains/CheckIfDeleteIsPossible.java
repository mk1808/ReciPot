package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CheckIfDeleteIsPossible {
	
	public void execute(RecipeCollection recipeCollection) {
		if (!recipeCollection.isCanDelete()) {
			throw new ConflictException("recipeCollections.error.defaultCollectionCannotBeDeleted");
		}
	}
}
