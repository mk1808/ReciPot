package pl.mk.recipot.opinions.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Rating;

public class UpdateAuthorAndCreationDateInRating {
	public Rating execute(Rating rating, AppUser author) {
		rating.setAuthor(author);
		rating.setCreated(new Date());
		return rating;
	}
}
