package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.NotFoundException;

public class CheckIfRecipeDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new NotFoundException("recipes.error.recipeNotFound");
	}
}
