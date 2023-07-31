package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.domains.CheckIfCollectionsNotEquals;
import pl.mk.recipot.commons.exceptions.BadRequestException;
import pl.mk.recipot.commons.models.Ingredient;

public class CheckIfIngredientsUnique extends CheckIfCollectionsNotEquals {

	public void execute(List<Ingredient> ingredients) {
		List<String> ingredientsNames = new GetRecipeIngredientsNames().execute(ingredients);
		List<String> uniqueNames = ingredientsNames.stream().distinct().toList();
		execute(uniqueNames, ingredients);
	}

	@Override
	protected RuntimeException getException() {
		return new BadRequestException("recipes.error.ingredientsNotUnique");
	}
}
