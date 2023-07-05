package pl.mk.recipot.recipes.domains;

import java.util.List;
import java.util.Set;

import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.SharedRecipe;

public class GetRecipeIngredientNameList {
	public List<String> execute(List<Ingredient> allIngredientsToUpdate) {
		return allIngredientsToUpdate.stream().map(Ingredient::getName).toList();
	}
}
