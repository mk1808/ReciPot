package pl.mk.recipot.recipes.domains;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class UpdateRecipeIngredientsForRecipe {
	public List<RecipeIngredient> execute(Recipe savedRecipe,Recipe newRecipe, List<Ingredient> ingredients){
		List<RecipeIngredient> recipeIngredients = newRecipe.getRecipeIngredients();
		
		
		recipeIngredients = updateIngredients(ingredients, recipeIngredients);
		recipeIngredients.forEach(ri->ri.setRecipe(savedRecipe));
		
		return recipeIngredients;
	}

	private List<RecipeIngredient> updateIngredients(List<Ingredient> ingredients, List<RecipeIngredient> recipeIngredients) {
		Map<String, Ingredient> map = createMap(ingredients);
		
		for (RecipeIngredient recipeIngredient:recipeIngredients) {
			recipeIngredient.setIngredient(map.get(recipeIngredient.getIngredient().getName()));
		}
		return recipeIngredients;
	}
	
	private Map<String, Ingredient> createMap(List<Ingredient> ingredients){
		return ingredients.stream().collect(Collectors.toMap(Ingredient::getName, ingredient->ingredient));
	}
}
