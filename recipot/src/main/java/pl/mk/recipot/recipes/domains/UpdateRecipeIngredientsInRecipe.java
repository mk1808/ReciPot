package pl.mk.recipot.recipes.domains;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class UpdateRecipeIngredientsInRecipe {
	public List<RecipeIngredient> execute(Recipe recipe, List<RecipeIngredient> recipeIngredients, List<Ingredient> ingredients) {
		updateIngredients(recipe, recipeIngredients, ingredients);

		return recipeIngredients;
	}

	private void updateIngredients(Recipe recipe, List<RecipeIngredient> recipeIngredients, List<Ingredient> ingredients) {
		Map<String, Ingredient> map = createIngredientsMap(ingredients);
		
		for (RecipeIngredient recipeIngredient : recipeIngredients) {
			String name = recipeIngredient.getIngredient().getName();
			if (map.containsKey(name)) {
				recipeIngredient.setIngredient(map.get(name));
				recipeIngredient.setRecipe(recipe);
			}
		}
	}

	private Map<String, Ingredient> createIngredientsMap(List<Ingredient> ingredients) {
		return ingredients.stream().collect(Collectors.toMap(Ingredient::getName, ingredient -> ingredient));
	}
}
