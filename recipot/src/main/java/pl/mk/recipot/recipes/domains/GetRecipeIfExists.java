package pl.mk.recipot.recipes.domains;

import java.util.Optional;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.Recipe;

public class GetRecipeIfExists {
	public Recipe execute(Optional<Recipe> recipe) {
		if(recipe.isEmpty()) {
			throw new NotFoundException("Recipe does not exists");
		}
		return recipe.get();
	}
}
