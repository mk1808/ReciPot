package pl.mk.recipot.dictionaries.services;

import java.util.Set;

import pl.mk.recipot.commons.models.Ingredient;

public interface IIngredientsService {

	Set<Ingredient> saveMany(Set<Ingredient> ingredients);

}
