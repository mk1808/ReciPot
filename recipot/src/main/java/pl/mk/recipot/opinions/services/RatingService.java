package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.SetRecipeNull;
import pl.mk.recipot.commons.domains.SetUserNull;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.facades.INotificationsFacade;
import pl.mk.recipot.opinions.domains.UpdateAverageRatingInRecipe;
import pl.mk.recipot.opinions.domains.UpdateOrCreateNewRating;
import pl.mk.recipot.opinions.dtos.RecipeAverageRating;
import pl.mk.recipot.opinions.repositories.IRatingsRepository;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.facades.IRecipesFacade;

@Service
public class RatingService implements ICrudService<Rating> {

	private IRatingsRepository ratingsRepository;
	private IAuthFacade authFacade;
	private IRecipesFacade recipesFacade;
	private INotificationsFacade notificationFacade;
	private IRecipeCollectionsFacade recipeCollectionsFacade;

	public RatingService(IRatingsRepository ratingsRepository, IAuthFacade authFacade, IRecipesFacade recipesFacade,
			INotificationsFacade notificationFacade, IRecipeCollectionsFacade recipeCollectionsFacade) {
		super();
		this.ratingsRepository = ratingsRepository;
		this.authFacade = authFacade;
		this.recipesFacade = recipesFacade;
		this.notificationFacade = notificationFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
	}

	@Override
	public Rating save(Rating rating) {
		rating.setRecipe(recipesFacade.get(rating.getRecipe().getId()));
		Rating savedRating = updateOrCreateNew(rating);
		updateRecipeAverageRating(savedRating);
		notificationFacade.notifyNewRecipeRating(savedRating);
		new SetUserNull().execute(savedRating);
		new SetRecipeNull().execute(savedRating);
		return savedRating;
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
	
	private Rating updateOrCreateNew(Rating rating) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<Rating> existingRating = ratingsRepository.findByUserAndRecipe(currentUser, rating.getRecipe());

		Rating newRating = ratingsRepository
				.save(new UpdateOrCreateNewRating().execute(currentUser, existingRating, rating));
		updateCollection(existingRating.isEmpty(), currentUser, newRating);

		return newRating;
	}

	private void updateCollection(Boolean isEmpty, AppUser currentUser, Rating rating) {
		if (isEmpty) {
			recipeCollectionsFacade.addRecipeToUserDefaultCollection(
					currentUser, 
					DefaultRecipeCollections.COMMENTED,
					rating.getRecipe()
			);
		}
	}

	private void updateRecipeAverageRating(Rating rating) {
		RecipeAverageRating recipeRatingCount = ratingsRepository.getRecipeAverageRating(rating.getRecipe());
		recipesFacade.updateRecipeAverageRating(
				new UpdateAverageRatingInRecipe().execute(rating.getRecipe(), recipeRatingCount)
		);
	}

}
