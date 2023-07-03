package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.models.SharedRecipe;

public class GetRecipeWasSharedWithSenderUser {

	public boolean execute(SharedRecipe sharedRecipe, List<SharedRecipe> sharedRecipes) {
		return !sharedRecipes.isEmpty()
				&& sharedRecipes.get(0).getRecipe().getId().equals(sharedRecipe.getRecipe().getId());
	}

}
