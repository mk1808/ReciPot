package pl.mk.recipot.recipes.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.enums.PredefinedRecipeFilter;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.SharedRecipe;

@RequestMapping("/api/recipes")
public interface IRecipesController {

	@PostMapping
	ResponseEntity<Response<Recipe>> create(@RequestBody @Valid Recipe recipe);

	@GetMapping("/{id}")
	ResponseEntity<Response<Recipe>> get(@PathVariable UUID id);

	@PutMapping("/{id}")
	ResponseEntity<Response<Recipe>> update(@PathVariable UUID id, @RequestBody @Valid Recipe recipe);

	@PatchMapping("/visibility/{recipeId}")
	ResponseEntity<Response<Void>> changeVisibility(@PathVariable UUID recipeId);

	@PostMapping("/sharing")
	ResponseEntity<Response<SharedRecipe>> shareWithUser(@RequestBody @Valid SharedRecipe sharedRecipe);

	@PostMapping("/search")
	ResponseEntity<Response<Page<Recipe>>> search(
			@RequestParam(name = "pageNum", defaultValue = "0") int pageNum,
			@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
			@RequestBody RecipeSearchDto recipeSearchDto);

	@GetMapping("/predefinedFilter")
	ResponseEntity<Response<Page<Recipe>>> getPredefinedFilter(
			@RequestParam(name = "pageNum", defaultValue = "0") int pageNum,
			@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
			@RequestParam(name = "type") PredefinedRecipeFilter type);

	@GetMapping("/random")
	public ResponseEntity<Response<List<Recipe>>> getRandomRecipes(@RequestParam(name = "pageSize", defaultValue = "1") int pageSize);
}
