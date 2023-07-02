package pl.mk.recipot.recipes.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.models.Recipe;

@RequestMapping("/api/recipes")
public interface IRecipesController {

	@PostMapping
	Recipe create(Recipe recipe);

}
