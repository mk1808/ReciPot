package pl.mk.recipot.dictionaries.services;

import java.util.List;

import pl.mk.recipot.commons.models.Ingredient;

public interface IIngredientsService {

	List<Ingredient> saveMany(List<Ingredient> ingredients);

}
