package pl.mk.recipot.dictionaries.domains;

import java.util.List;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.Ingredient;

public class CheckIfIngredientExists {
	public void execute(List<Ingredient> ingredient) {
		if (!ingredient.isEmpty()) {
			throw new ConflictException("dictionaries.error.ingredientExists");
		}
	}
}
