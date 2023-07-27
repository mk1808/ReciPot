package pl.mk.recipot.recipes.services;

import java.util.UUID;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

public interface IRecipesService {

	public void changeVisibility(UUID recipeId);

	public int getAllRecipesCount();

	int getUserRecipesCount(AppUser user);

	public Recipe updateRecipeAverageRating(Recipe recipe);
}
