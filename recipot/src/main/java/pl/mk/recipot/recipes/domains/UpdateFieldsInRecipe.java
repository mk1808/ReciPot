package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.models.Recipe;

public class UpdateFieldsInRecipe {
	public Recipe execute(Recipe existingRecipe, Recipe newRecipe) {
		existingRecipe.setHashTags(newRecipe.getHashTags());
		existingRecipe.setCategories(newRecipe.getCategories());
		existingRecipe.setDescription(newRecipe.getDescription());
		existingRecipe.setDifficulty(newRecipe.getDifficulty());
		existingRecipe.setImage(newRecipe.getImage());
		existingRecipe.setName(newRecipe.getName());
		existingRecipe.setNumberOfDishes(newRecipe.getNumberOfDishes());
		existingRecipe.setRequiredEffort(newRecipe.getRequiredEffort());
		existingRecipe.setTimeAmount(newRecipe.getTimeAmount());
		existingRecipe.setUrl(newRecipe.getUrl());
		return existingRecipe;
	}
}
