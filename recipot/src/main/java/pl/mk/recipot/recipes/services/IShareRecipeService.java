package pl.mk.recipot.recipes.services;

import java.util.UUID;

import pl.mk.recipot.commons.models.SharedRecipe;

public interface IShareRecipeService {
	public SharedRecipe shareWithUser(SharedRecipe sharedRecipe);
	public void deleteSharingByRecipeId(UUID recipeId);
}
