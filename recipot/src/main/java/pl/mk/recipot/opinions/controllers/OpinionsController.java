package pl.mk.recipot.opinions.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.services.ICrudService;

@RestController
public class OpinionsController implements IOpinionsController {
	private ICrudService<Rating> ratingsCrudService;
	private ICrudService<Comment> commentCrudService;

	public OpinionsController(ICrudService<Rating> ratingsCrudService, ICrudService<Comment> commentCrudService) {
		super();
		this.ratingsCrudService = ratingsCrudService;
		this.commentCrudService = commentCrudService;
	}

	@Override
	public ResponseEntity<Response<Rating>> createRating(Rating rating) {
		return new OkResponseFactory().createResponse(ratingsCrudService.save(rating));
	}

	@Override
	public ResponseEntity<Response<Comment>> createComment(Comment comment) {
		return new OkResponseFactory().createResponse(commentCrudService.save(comment));
	}

}
