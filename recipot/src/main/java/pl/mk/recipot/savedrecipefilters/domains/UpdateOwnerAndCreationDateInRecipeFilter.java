package pl.mk.recipot.savedrecipefilters.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeFilter;

public class FillRecipeFilterOwnerAndCreationDate {
	public RecipeFilter execute(RecipeFilter recipeFilter, AppUser owner) {
		recipeFilter.setOwner(owner);
		recipeFilter.setCreated(new Date());
		return recipeFilter;
	}
}
