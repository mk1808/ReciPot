package pl.mk.recipot.opinions.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;

@RequestMapping("/api/opinions")
public interface IOpinionsController {

	@PostMapping("/ratings")
	ResponseEntity<Response<Rating>> createRating(@RequestBody Rating rating);

	@PostMapping("/comments")
	ResponseEntity<Response<Comment>> createComment(@RequestBody Comment comment);

}
