package pl.mk.recipot.recipes.domains;

import java.util.List;

import pl.mk.recipot.commons.models.Ingredient;

public class GetRecipeIngredientNameList {
	public List<String> execute(List<Ingredient> allIngredientsToUpdate) {
		return allIngredientsToUpdate.stream().map(Ingredient::getName).toList();
	}
}
