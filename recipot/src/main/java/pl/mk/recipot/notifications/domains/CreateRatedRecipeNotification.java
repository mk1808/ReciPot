package pl.mk.recipot.notifications.domains;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.notifications.dtos.RecipeNotificationValuesDto;

public class CreateRatedRecipeNotification {
	public Notification execute(Rating rating) {
		return Notification.builder()
				.owner(rating.getRecipe().getOwner())
				.type(NotificationType.RECIPE_RATED)
				.value(getNotificationValue(rating))
				.build();
	}

	private String getNotificationValue(Rating rating) {
		try {
			return new ObjectMapper().writeValueAsString(getRecipeNotificationValue(rating));
		} catch (JsonProcessingException e) {
			throw new IllegalArgumentException();
		}
	}
	
	private RecipeNotificationValuesDto getRecipeNotificationValue(Rating rating) {
		return RecipeNotificationValuesDto.builder()
				.senderUser(rating.getAuthor().getLogin())
				.recipeName(rating.getRecipe().getName())
				.value(rating.getValue())
				.build();
	}
}
