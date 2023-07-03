package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.SharedRecipe;

public class CheckIfRecipeWasNotSharedWithUser {
	public void execute(List<SharedRecipe> sharedRecipes) {
		if (!sharedRecipes.isEmpty()) {
			throw new ConflictException("Recipe was already shared with user");
		}
	}
}
