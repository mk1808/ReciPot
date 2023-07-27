package pl.mk.recipot.notifications.domains;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.notifications.dtos.RecipeNotificationValuesDto;

public class CreateCommentedRecipeNotification {
	public Notification execute(Comment comment) {
		return Notification.builder()
				.owner(comment.getRecipe().getOwner())
				.type(NotificationType.RECIPE_COMMENTED)
				.value(getNotificationValue(comment))
				.build();
	}

	private String getNotificationValue(Comment comment) {
		try {
			return new ObjectMapper().writeValueAsString(getRecipeNotificationValue(comment));
		} catch (JsonProcessingException e) {
			throw new IllegalArgumentException();
		}
	}
	
	private RecipeNotificationValuesDto getRecipeNotificationValue(Comment comment) {
		return RecipeNotificationValuesDto.builder()
				.senderUser(comment.getAuthor().getLogin())
				.recipeName(comment.getRecipe().getName())
				.value(comment.getContent())
				.build();
	}
}
