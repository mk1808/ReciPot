package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.opinions.domains.ClearRatingFilds;
import pl.mk.recipot.opinions.domains.FillRatingAuthorAndCreationDate;
import pl.mk.recipot.opinions.domains.UpdateRating;
import pl.mk.recipot.opinions.repositories.IRatingsRepository;

@Service
public class RatingService implements ICrudService<Rating> {

	private IRatingsRepository ratingsRepository;
	private IAuthFacade authFacade;

	public RatingService(IRatingsRepository ratingsRepository, IAuthFacade authFacade) {
		super();
		this.ratingsRepository = ratingsRepository;
		this.authFacade = authFacade;
	}

	@Override
	public Rating save(Rating rating) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<Rating> existingRating = ratingsRepository.findByUserAndRecipe(currentUser, rating.getRecipe());
		return new ClearRatingFilds().execute(
			ratingsRepository.save(
				existingRating.isEmpty() 
					? new FillRatingAuthorAndCreationDate().execute(rating, currentUser)
					: new UpdateRating().execute(existingRating.get(0), rating)));
	}

	@Override
	public Rating update(Rating obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Rating get(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

}
