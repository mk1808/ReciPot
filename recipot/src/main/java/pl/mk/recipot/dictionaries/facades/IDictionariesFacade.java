package pl.mk.recipot.dictionaries.facades;

import java.util.List;
import java.util.Set;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;

public interface IDictionariesFacade {
	
	Set<HashTag> saveManyHashTags(Set<HashTag> tags);
	
	Set<Ingredient> saveManyIngredients(Set<Ingredient> ingredients);

	Set<Category> getCategories(Set<Category> categories);

}
