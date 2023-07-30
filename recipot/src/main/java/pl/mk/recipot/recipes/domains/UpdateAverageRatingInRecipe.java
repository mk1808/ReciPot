package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.models.Recipe;

public class UpdateAverageRatingInRecipe {
	public Recipe execute(Recipe existingRecipe, Recipe updatedRecipe) {
		existingRecipe.setAverageRating(updatedRecipe.getAverageRating());
		existingRecipe.setRatingsCount(updatedRecipe.getRatingsCount());
		return existingRecipe;
	}
}
