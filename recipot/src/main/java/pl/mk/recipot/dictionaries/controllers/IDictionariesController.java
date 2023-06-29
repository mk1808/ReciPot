package pl.mk.recipot.dictionaries.controllers;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.dictionaries.dtos.CategoriesFilterDto;

@RequestMapping("/api/dictionaries")
public interface IDictionariesController {

	@PostMapping("/categories")
	Category createCategory(@RequestBody Category category);

	@GetMapping("/categories")
	Page<Category> getAllCategories(CategoriesFilterDto filterDto);
}
