package pl.mk.recipot.recipes.services;

import pl.mk.recipot.commons.models.SharedRecipe;

public interface IShareRecipeService {
	public SharedRecipe shareWithUser(SharedRecipe sharedRecipe);
}
