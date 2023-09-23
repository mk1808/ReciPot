package pl.mk.recipot.notifications.domains;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.interfaces.IRecipeRelated;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;
import pl.mk.recipot.notifications.dtos.RecipeNotificationValuesDto;

public abstract class AbstractCreateRecipeNotification<T extends IRecipeRelated & IUserRelated> {
	private T object;

	public Notification execute(T object) {
		this.object = object;
		return build();
	}

	protected abstract NotificationType getType();

	protected abstract Object getValue(T object);

	private Notification build() {
		return Notification.builder()
				.owner(getOwner(object))
				.type(getType())
				.value(getJsonNotificationValue())
				.build();
	}

	private String getJsonNotificationValue() {
		try {
			return new ObjectMapper().writeValueAsString(getNotificationValue());
		} catch (JsonProcessingException e) {
			throw new IllegalArgumentException();
		}
	}

	private RecipeNotificationValuesDto getNotificationValue() {
		return RecipeNotificationValuesDto.builder()
				.senderUser(getSender().getLogin())
				.recipeName(getRecipe().getName())
				.value(getValue(object))
				.build();
	}

	private Recipe getRecipe() {
		return object.getRecipe();
	}

	protected AppUser getOwner(T object) {
		return getRecipe().getOwner();
	}

	private AppUser getSender() {
		return object.getUser();
	}

}
