package pl.mk.recipot.opinions.domains;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.opinions.dtos.RecipeAverageRating;

public class UpdateRecipeAverageRating {
	public Recipe execute(Recipe recipe, RecipeAverageRating recipeAverageRating) {
		recipe.setAverageRating(recipeAverageRating.getAverageRating());
		recipe.setRatingsCount(recipeAverageRating.getRatingsCount());
		return recipe;
	}
}
