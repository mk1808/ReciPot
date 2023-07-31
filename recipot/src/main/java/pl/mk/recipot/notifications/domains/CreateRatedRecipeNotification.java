package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.Rating;

public class CreateRatedRecipeNotification extends AbstractCreateRecipeNotification<Rating> {
	@Override
	protected NotificationType getType() {
		return NotificationType.RECIPE_RATED;
	}

	@Override
	protected Object getValue(Rating rating) {
		return rating.getValue();
	}
}
