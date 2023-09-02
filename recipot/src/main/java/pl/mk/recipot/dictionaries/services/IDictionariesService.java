package pl.mk.recipot.dictionaries.services;

import java.util.List;

import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.enums.RecipeAmountOfDishes;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;

public interface IDictionariesService {

	List<CategoryDto> getHierarchicalCategoriesList();

	List<RecipeRequiredEffort> getAllRequiredEfforts();

	List<RecipeDifficulty> getAllDifficulties();

	List<RecipeAccessType> getAllAccessTypes();

	List<RecipeAmountOfDishes> getAllAmountOfDishes();
}
