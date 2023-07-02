package pl.mk.recipot.notifications.dtos;

import java.util.UUID;

import pl.mk.recipot.commons.enums.NotificationType;

public class NotificationDto {
	public UUID id;
	public NotificationType type;
	public String value;

	public NotificationDto(UUID id, NotificationType type, String value) {
		super();
		this.id = id;
		this.type = type;
		this.value = value;
	}

}
