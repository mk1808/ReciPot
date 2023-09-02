package pl.mk.recipot.dictionaries.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.enums.RecipeAmountOfDishes;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.domains.CreateHierarchicalCategoriesList;
import pl.mk.recipot.dictionaries.dtos.CategoriesFilterDto;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;

@Service
@Qualifier("dictionariesService")
public class DictionariesService implements IDictionariesService {
	private IFilterService<Category, CategoriesFilterDto> categoryFilterService;

	public DictionariesService(IFilterService<Category, CategoriesFilterDto> categoryFilterService) {
		super();
		this.categoryFilterService = categoryFilterService;
	}

	@Override
	public List<CategoryDto> getHierarchicalCategoriesList() {
		return new CreateHierarchicalCategoriesList()
				.execute(categoryFilterService.filter(new CategoriesFilterDto()).getContent());
	}

	@Override
	public List<RecipeRequiredEffort> getAllRequiredEfforts() {
		return Arrays.asList(RecipeRequiredEffort.values());
	}

	@Override
	public List<RecipeDifficulty> getAllDifficulties() {
		return Arrays.asList(RecipeDifficulty.values());
	}

	@Override
	public List<RecipeAccessType> getAllAccessTypes() {
		return Arrays.asList(RecipeAccessType.values());
	}

	@Override
	public List<RecipeAmountOfDishes> getAllAmountOfDishes() {
		return Arrays.asList(RecipeAmountOfDishes.values());
	}

}
