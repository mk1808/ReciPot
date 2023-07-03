package pl.mk.recipot.recipecollections.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

@RequestMapping("/api/recipeCollections")
public interface IRecipeCollectionsController {
	
	@PostMapping
	ResponseEntity<Response<RecipeCollection>> create(@RequestBody @Valid RecipeCollection recipeCollection);
	
	
	@PostMapping("/{collectionId}/recipe")
	ResponseEntity<Response<RecipeCollectionItem>> addItem(@PathVariable UUID collectionId, @RequestBody @Valid RecipeCollectionItem recipeCollectionItem);
}
