package pl.mk.recipot.recipes;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

public class UpdateUserInRecipe {
	public Recipe execute(Recipe recipe, AppUser user) {
		recipe.setOwner(user);
		return recipe;
	}

}
