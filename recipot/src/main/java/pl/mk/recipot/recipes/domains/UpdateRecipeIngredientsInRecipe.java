package pl.mk.recipot.recipes.domains;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class UpdateRecipeIngredientsInRecipe {
	private Recipe savedRecipe;
	private Recipe newRecipe;
	private List<Ingredient> ingredients;
	
	public List<RecipeIngredient> execute(Recipe savedRecipe, Recipe newRecipe, List<Ingredient> ingredients) {
		this.savedRecipe = savedRecipe;
		this.newRecipe = newRecipe;
		this.ingredients = ingredients;

		updateIngredients();
		
		return newRecipe.getRecipeIngredients();
	}

	private void updateIngredients() {
		Map<String, Ingredient> map = createIngredientsMap();

		for (RecipeIngredient recipeIngredient : newRecipe.getRecipeIngredients()) {
			recipeIngredient.setIngredient(map.get(recipeIngredient.getIngredient().getName()));
			recipeIngredient.setRecipe(savedRecipe);
		}
	}

	private Map<String, Ingredient> createIngredientsMap() {
		return ingredients.stream().collect(Collectors.toMap(Ingredient::getName, ingredient -> ingredient));
	}
}
