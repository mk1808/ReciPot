package pl.mk.recipot.recipes.domains;

import java.util.Set;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class UpdateRecipeIngredientsForRecipe {
	public Set<RecipeIngredient> execute(Recipe recipe, Set<Ingredient> ingredients){
		Set<RecipeIngredient> recipeIngredients = recipe.getRecipeIngredients();
		
		
		recipeIngredients = updateIngredients(ingredients, recipeIngredients);
		recipeIngredients.forEach(ri->ri.setRecipe(recipe));
		
		return recipeIngredients;
	}

	private Set<RecipeIngredient> updateIngredients(Set<Ingredient> ingredients, Set<RecipeIngredient> recipeIngredients) {
		for (RecipeIngredient recipeIngredient:recipeIngredients) {
			String name = recipeIngredient.getIngredient().getName();
			Ingredient foundIngredient = ingredients.stream().filter(ingredient->ingredient.getName().equals(name)).toList().get(0);
			recipeIngredient.setIngredient(foundIngredient);
		}
		return recipeIngredients;
	}
}
