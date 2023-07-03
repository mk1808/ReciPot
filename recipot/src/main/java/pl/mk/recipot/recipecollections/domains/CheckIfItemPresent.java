package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class CheckIfItemPresent {
	public void execute(RecipeCollectionItem item ) {
		
		if(item==null) {
			throw new ConflictException("This collection does not contain this recipe");
		}
	}
}
