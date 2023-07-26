package pl.mk.recipot.notifications.domains;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.models.SharedRecipe;

public class CreateSharedRecipeNotification {
	public Notification execute(SharedRecipe sharedRecipe) {
		return Notification.builder()
				.owner(sharedRecipe.getReceiverUser())
				.type(NotificationType.SHARED_RECIPE)
				.value(getNotificationValue(sharedRecipe))
				.build();
	}

	private String getNotificationValue(SharedRecipe sharedRecipe) {
		try {
			return new ObjectMapper().writeValueAsString(new SharedRecipeNotification(sharedRecipe));
		} catch (JsonProcessingException e) {
			throw new IllegalArgumentException();
		}
	}

	@Data
	private class SharedRecipeNotification {
		String senderUser;
		String recipeName;
		String comment;

		SharedRecipeNotification(SharedRecipe sharedRecipe) {
			senderUser = sharedRecipe.getSenderUser().getLogin();
			recipeName = sharedRecipe.getRecipe().getName();
			comment = sharedRecipe.getComment();
		}
	}
}
