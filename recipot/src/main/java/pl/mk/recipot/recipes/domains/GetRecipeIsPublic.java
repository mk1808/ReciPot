package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.models.SharedRecipe;

public class GetRecipeIsPublic {
	public boolean execute(SharedRecipe sharedRecipe) {
		return RecipeAccessType.PUBLIC.equals(sharedRecipe.getRecipe().getAccessType());
	}
}
