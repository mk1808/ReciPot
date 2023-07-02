package pl.mk.recipot.recipes.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Recipe;

@RequestMapping("/api/recipes")
public interface IRecipesController {

	@PostMapping
	ResponseEntity<Response<Recipe>> create(Recipe recipe);

	@PatchMapping("/visibility/{recipeId}")
	ResponseEntity<Response<Void>> changeVisibility(@PathVariable UUID recipeId);

}
