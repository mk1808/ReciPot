package pl.mk.recipot.recipecollections.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeCollection;

@RequestMapping("/api/recipeCollections")
public interface IRecipeCollectionsController {
	
	@PostMapping
	ResponseEntity<Response<RecipeCollection>> create(@RequestBody @Valid RecipeCollection recipeCollection);

}
