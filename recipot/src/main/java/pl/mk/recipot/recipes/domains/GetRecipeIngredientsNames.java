package pl.mk.recipot.recipes.domains;

import java.util.Collection;
import java.util.List;

import pl.mk.recipot.commons.models.Ingredient;

public class GetRecipeIngredientsNames {
	public List<String> execute(Collection<Ingredient> ingredients) {
		return ingredients.stream().map(Ingredient::getName).toList();
	}
}
