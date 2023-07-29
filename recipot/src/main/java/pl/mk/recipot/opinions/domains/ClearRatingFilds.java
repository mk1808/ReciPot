package pl.mk.recipot.opinions.domains;

import pl.mk.recipot.commons.models.Rating;

public class ClearRatingFilds {
	public Rating execute(Rating rating) {
		if (rating == null) {
			return null;
		}
		rating.setRecipe(null);
		return rating;
	}
}
