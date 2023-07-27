package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.facades.INotificationsFacade;
import pl.mk.recipot.opinions.domains.ClearRatingFilds;
import pl.mk.recipot.opinions.domains.UpdateOrCreateNewRating;
import pl.mk.recipot.opinions.domains.UpdateRecipeAverageRating;
import pl.mk.recipot.opinions.dtos.RecipeAverageRating;
import pl.mk.recipot.opinions.repositories.IRatingsRepository;
import pl.mk.recipot.recipes.facades.IRecipesFacade;

@Service
public class RatingService implements ICrudService<Rating> {

	private IRatingsRepository ratingsRepository;
	private IAuthFacade authFacade;
	private IRecipesFacade recipesFacade;
	private INotificationsFacade notificationFacade;

	public RatingService(IRatingsRepository ratingsRepository, IAuthFacade authFacade, IRecipesFacade recipesFacade,
			INotificationsFacade notificationFacade) {
		super();
		this.ratingsRepository = ratingsRepository;
		this.authFacade = authFacade;
		this.recipesFacade = recipesFacade;
		this.notificationFacade = notificationFacade;
	}

	@Override
	public Rating save(Rating rating) {
		rating.setRecipe(recipesFacade.get(rating.getRecipe().getId()));
		Rating savedRating = updateOrCreateNew(rating);
		updateRecipeAverageRating(savedRating);
		notificationFacade.notifyNewRecipeRating(savedRating);
		return new ClearRatingFilds().execute(savedRating);
	}

	private Rating updateOrCreateNew(Rating rating) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<Rating> existingRating = ratingsRepository.findByUserAndRecipe(currentUser, rating.getRecipe());
		return ratingsRepository.save(new UpdateOrCreateNewRating().execute(currentUser, existingRating, rating));
	}

	private void updateRecipeAverageRating(Rating rating) {
		RecipeAverageRating recipeRatingCount = ratingsRepository.getRecipeAverageRating(rating.getRecipe());
		recipesFacade.updateRecipeAverageRating(
				new UpdateRecipeAverageRating().execute(rating.getRecipe(), recipeRatingCount));
	}

	@Override
	public Rating update(Rating obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Rating get(UUID id) {
		return ratingsRepository.findById(id).orElse(null);
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

}
