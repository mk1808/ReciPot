package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.opinions.domains.ClearRatingFilds;
import pl.mk.recipot.opinions.domains.UpdateOrCreateNewRating;
import pl.mk.recipot.opinions.domains.UpdateRecipeAverageRating;
import pl.mk.recipot.opinions.dtos.RecipeAverageRating;
import pl.mk.recipot.opinions.repositories.IRatingsRepository;
import pl.mk.recipot.recipes.facades.IRecipesFacade;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;

@Service
public class RatingService implements ICrudService<Rating> {

	private IRatingsRepository ratingsRepository;
	private IAuthFacade authFacade;
	private IRecipesFacade recipeFacade;
	private IRecipeCollectionsFacade recipeCollectionsFacade;

	public RatingService(IRatingsRepository ratingsRepository, IAuthFacade authFacade, IRecipesFacade recipeFacade,
			IRecipeCollectionsFacade recipeCollectionsFacade) {
		super();
		this.ratingsRepository = ratingsRepository;
		this.authFacade = authFacade;
		this.recipeFacade = recipeFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
	}

	@Override
	public Rating save(Rating rating) {
		Rating savedRating = updateOrCreateNew(rating);
		updateRecipeAverageRating(savedRating);
		return new ClearRatingFilds().execute(savedRating);
	}

	private Rating updateOrCreateNew(Rating rating) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<Rating> existingRating = ratingsRepository.findByUserAndRecipe(currentUser, rating.getRecipe());

		Rating newRating = ratingsRepository
				.save(new UpdateOrCreateNewRating().execute(currentUser, existingRating, rating));
		updateCollection(existingRating.isEmpty(), currentUser, newRating);

		return new ClearRatingFilds().execute(newRating);
	}

	private void updateCollection(Boolean isEmpty, AppUser currentUser, Rating rating) {
		if (isEmpty) {
			recipeCollectionsFacade.addRecipeToUserDefaultCollection(currentUser, DefaultRecipeCollections.COMMENTED,
					rating.getRecipe());
		}
	}

	private void updateRecipeAverageRating(Rating rating) {
		RecipeAverageRating recipeRatingCount = ratingsRepository.getRecipeAverageRating(rating.getRecipe());
		recipeFacade.updateRecipeAverageRating(
				new UpdateRecipeAverageRating().execute(rating.getRecipe(), recipeRatingCount));
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
