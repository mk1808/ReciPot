package pl.mk.recipot.dictionaries.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;

@RequestMapping("/api/dictionaries")
public interface IDictionariesController {

	@PostMapping("/categories")
	Category createCategory(@RequestBody Category category);

	@GetMapping("/categories")
	List<CategoryDto> getAllCategories();
	
	@GetMapping("/requiredEfforts")
	List<RecipeRequiredEffort> getAllRequiredEfforts();

  @GetMapping("/difficulties")
	List<RecipeDifficulty> getAllDifficulties();
}
