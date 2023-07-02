package pl.mk.recipot.recipes.domains;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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
		Map<String, Ingredient> map = createMap(ingredients);
		
		for (RecipeIngredient recipeIngredient:recipeIngredients) {
			recipeIngredient.setIngredient(map.get(recipeIngredient.getIngredient().getName()));
		}
		return recipeIngredients;
	}
	
	private Map<String, Ingredient> createMap(Set<Ingredient> ingredients){
		return ingredients.stream().collect(Collectors.toMap(Ingredient::getName, ingredient->ingredient));
	}
}
