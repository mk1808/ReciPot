package pl.mk.recipot.opinions.domains;

import pl.mk.recipot.commons.models.Rating;

public class UpdateRating {
	public Rating execute(Rating existingRating, Rating changedRating) {
		existingRating.setValue(changedRating.getValue());
		return existingRating;
	}
}
