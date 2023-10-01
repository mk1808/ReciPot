package pl.mk.recipot.notifications.dtos;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeNotificationValuesDto {
	String senderUser;
	String recipeName;
	UUID recipeId;
	Object value;
}
