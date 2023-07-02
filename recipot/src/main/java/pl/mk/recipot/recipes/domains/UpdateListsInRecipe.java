package pl.mk.recipot.recipes.domains;

import java.util.Set;

import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Recipe;

public class UpdateListsInRecipe {
	
	public Recipe execute(Recipe recipe, Set<HashTag> tags) {
		recipe.setHashTags(tags);
		return recipe;
	}

}
