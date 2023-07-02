package pl.mk.recipot.recipes.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

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

}
