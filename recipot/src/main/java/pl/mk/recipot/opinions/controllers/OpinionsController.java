package pl.mk.recipot.opinions.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.opinions.dtos.OpinionDto;
import pl.mk.recipot.opinions.services.IOpinionsService;

@RestController
public class OpinionsController implements IOpinionsController {
	private ICrudService<Rating> ratingsCrudService;
	private ICrudService<Comment> commentCrudService;

	private IOpinionsService opinionService;

	public OpinionsController(ICrudService<Rating> ratingsCrudService, ICrudService<Comment> commentCrudService,
			IOpinionsService opinionService) {
		super();
		this.ratingsCrudService = ratingsCrudService;
		this.commentCrudService = commentCrudService;
		this.opinionService = opinionService;
	}

	@Override
	public ResponseEntity<Response<Rating>> createRating(Rating rating) {
		return new CreatedResponseFactory().createResponse(ratingsCrudService.save(rating));
	}

	@Override
	public ResponseEntity<Response<Comment>> createComment(Comment comment) {
		return new CreatedResponseFactory().createResponse(commentCrudService.save(comment));
	}

	@Override
	public ResponseEntity<Response<List<OpinionDto>>> getRecipeOpinions(UUID recipeId) {
		return new OkResponseFactory().createResponse(opinionService.getRecipeOpinions(recipeId));
	}

}
