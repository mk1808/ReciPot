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

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.RecipeFilter;

@RequestMapping("/api/savedRecipeFilters")
public interface ISavedRecipeFiltersController {

	@PostMapping()
	ResponseEntity<Response<RecipeFilter>> createRecipeFilter(@RequestBody @Valid RecipeFilter recipeFilter);

	@GetMapping()
	ResponseEntity<Response<List<RecipeFilter>>> getRecipeFilters();

	@DeleteMapping("/{recipeFilterId}")
	ResponseEntity<Response<Void>> deleteRecipeFilter(@PathVariable UUID recipeFilterId);
}
