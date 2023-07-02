package pl.mk.recipot.opinions.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.services.ICrudService;

@RestController
public class OpinionsController implements IOpinionsController {
	private ICrudService<Rating> ratingsCrudService;

	public OpinionsController(ICrudService<Rating> ratingsCrudService) {
		super();
		this.ratingsCrudService = ratingsCrudService;
	}

	@Override
	public ResponseEntity<Response<Rating>> createRating(Rating rating) {
		return new CreatedResponseFactory().createResponse(ratingsCrudService.save(rating));
	}

}
