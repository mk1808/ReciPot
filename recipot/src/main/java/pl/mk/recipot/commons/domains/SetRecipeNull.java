package pl.mk.recipot.commons.domains;

import pl.mk.recipot.commons.models.interfaces.IRecipeRelated;

public class SetRecipeNull {
	public <T extends IRecipeRelated> T execute(T recipeRelated) {
		recipeRelated.setRecipe(null);
		return recipeRelated;
	}
}
