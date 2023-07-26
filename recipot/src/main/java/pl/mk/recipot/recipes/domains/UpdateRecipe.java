package pl.mk.recipot.recipes.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.Recipe;

public class UpdateRecipe {
	public Recipe execute(Recipe recipe){
		recipe.setCreated(new Date());
		return recipe;
	}
}
