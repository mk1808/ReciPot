package pl.mk.recipot.opinions.domains;

import java.util.List;

import pl.mk.recipot.commons.domains.SetDateNowAndUserValue;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Rating;

public class UpdateOrCreateNewRating {
	public Rating execute(AppUser currentUser, List<Rating> existingRating, Rating updatedRating) {
		if (existingRating.isEmpty()) {
			return getNew(currentUser, updatedRating);
		}
		return update(currentUser, existingRating, updatedRating);
	}

	private Rating getNew(AppUser currentUser, Rating updatedRating) {
		return new SetDateNowAndUserValue().execute(updatedRating, currentUser);
	}

	private Rating update(AppUser currentUser, List<Rating> existingRating, Rating updatedRating) {
		return new UpdateRating().execute(existingRating.get(0), updatedRating);
	}
}
