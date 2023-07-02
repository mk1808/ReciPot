package pl.mk.recipot.savedrecipefilters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.RecipeFilter;

@RequestMapping("/api/savedRecipeFilters")
public interface ISavedRecipeFiltersController {

	@PostMapping()
	ResponseEntity<Response<Void>> createRecipeFilter(@RequestBody RecipeFilter recipeFilter);
}
