package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.Recipe;

public class CheckIfRecipeExists {
	public void execute(Recipe recipe) {
		if(recipe == null) {
			throw new NotFoundException("Can't find recipe with given id");
		}
	}

}
