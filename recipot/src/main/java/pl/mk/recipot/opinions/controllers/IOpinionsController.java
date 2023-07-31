package pl.mk.recipot.opinions.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.opinions.dtos.OpinionDto;

@RequestMapping("/api/opinions")
public interface IOpinionsController {

	@PostMapping("/ratings")
	ResponseEntity<Response<Rating>> createRating(@RequestBody @Valid Rating rating);

	@PostMapping("/comments")
	ResponseEntity<Response<Comment>> createComment(@RequestBody @Valid Comment comment);

	@GetMapping("/{recipeId}")
	ResponseEntity<Response<List<OpinionDto>>> getRecipeOpinions(@PathVariable UUID recipeId);

}
