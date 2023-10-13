package pl.mk.recipot.opinions.domains;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.opinions.dtos.RecipeAverageRating;

public class UpdateAverageRatingInRecipe {
	public Recipe execute(Recipe recipe, RecipeAverageRating recipeAverageRating) {
		double roundedValue = Math.round(recipeAverageRating.getAverageRating() * 100) / 100.0;
		recipe.setAverageRating(roundedValue);
		recipe.setRatingsCount(recipeAverageRating.getRatingsCount());
		return recipe;
	}
}
