package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.models.Recipe;

public class UpdateVisibilityInRecipe {
	public void execute(Recipe recipe) {
		switch (recipe.getAccessType()) {
		case PRIVATE:
			recipe.setAccessType(RecipeAccessType.PUBLIC);
			break;
		case PUBLIC:
			recipe.setAccessType(RecipeAccessType.PRIVATE);
			break;
		default:
			break;

		}
	}
}
