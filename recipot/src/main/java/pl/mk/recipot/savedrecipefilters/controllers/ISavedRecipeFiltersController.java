package pl.mk.recipot.savedrecipefilters.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.RecipeFilter;
import pl.mk.recipot.savedrecipefilters.dtos.RecipeFilterDto;

@RequestMapping("/api/savedRecipeFilters")
public interface ISavedRecipeFiltersController {

	@PostMapping()
	ResponseEntity<Response<Void>> createRecipeFilter(@RequestBody RecipeFilter recipeFilter);

	@GetMapping()
	ResponseEntity<Response<List<RecipeFilterDto>>> getRecipeFilters();

	@DeleteMapping("/{recipeFilterId}")
	ResponseEntity<Response<Void>> deleteRecipeFilter(@PathVariable UUID recipeFilterId);
}
