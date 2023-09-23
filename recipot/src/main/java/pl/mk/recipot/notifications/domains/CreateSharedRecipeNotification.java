package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.SharedRecipe;

public class CreateSharedRecipeNotification extends AbstractCreateRecipeNotification<SharedRecipe> {
	@Override
	protected NotificationType getType() {
		return NotificationType.SHARED_RECIPE;
	}

	@Override
	protected Object getValue(SharedRecipe sharedRecipe) {
		return sharedRecipe.getComment();
	}

	@Override
	protected AppUser getOwner(SharedRecipe sharedRecipe) {
		return sharedRecipe.getReceiverUser();
	}
}
