package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CheckIfDeleteIsPossible {

	public void execute(RecipeCollection recipeCollection) {
		if (!recipeCollection.isCanDelete()
				&& !DefaultRecipeCollections.FAVOURITE.getName().equals(recipeCollection.getName())) {
			throw new ConflictException("recipeCollections.error.defaultCollectionCannotBeDeleted");
		}
	}
}
