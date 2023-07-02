package pl.mk.recipot.recipecollections.domains;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;

public class UpdateUserInRecipeCollection {
	public RecipeCollection execute(RecipeCollection recipeCollection, AppUser user) {
		recipeCollection.setOwner(user);
		return recipeCollection;
	}
}
