package pl.mk.recipot.dictionaries.domains;

import java.util.List;

import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;

public class GetIngredientIfExists {
	public Ingredient execute(List<Ingredient> ingredients) {
		return ingredients.isEmpty() ? null: ingredients.get(0);
	}

}
