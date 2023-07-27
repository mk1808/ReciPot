package pl.mk.recipot.notifications.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeNotificationValuesDto {
	String senderUser;
	String recipeName;
	Object value;
}
