package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.exceptions.BadRequestException;
import pl.mk.recipot.commons.models.Ingredient;

public class CheckIfIngredientsUnique {
	public void execute(List<Ingredient> ingredients) {
		List<String> uniqueNames = ingredients.stream().map(Ingredient::getName).distinct().toList();
		if (uniqueNames.size() != ingredients.size()) {
			throw new BadRequestException("recipes.error.ingredientsNotUniqueO");
		}
	}
}
