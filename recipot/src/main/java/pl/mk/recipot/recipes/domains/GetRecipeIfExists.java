package pl.mk.recipot.recipes.domains;

import java.util.Optional;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.Recipe;

public class GetRecipeIfExists {
	public Recipe execute(Optional<Recipe> recipe) {
		if(recipe.isEmpty()) {
			throw new NotFoundException("recipes.error.recipeNotFound");
		}
		return recipe.get();
	}
}
