package pl.mk.recipot.recipes.facades;

import java.util.UUID;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

public interface IRecipesFacade {
	public Recipe get(UUID id);

	public int getAllRecipesCount();

	int getUserRecipesCount(AppUser user);

	public Recipe updateRecipeAverageRating(Recipe recipe);
}
