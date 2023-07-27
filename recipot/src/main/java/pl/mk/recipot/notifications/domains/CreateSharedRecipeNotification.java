package pl.mk.recipot.notifications.domains;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.notifications.dtos.RecipeNotificationValuesDto;

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
			return new ObjectMapper().writeValueAsString(getRecipeNotificationValue(sharedRecipe));
		} catch (JsonProcessingException e) {
			throw new IllegalArgumentException();
		}
	}
	
	private RecipeNotificationValuesDto getRecipeNotificationValue(SharedRecipe sharedRecipe) {
		return RecipeNotificationValuesDto.builder()
				.senderUser(sharedRecipe.getSenderUser().getLogin())
				.recipeName(sharedRecipe.getRecipe().getName())
				.value(sharedRecipe.getComment())
				.build();
	}
}
