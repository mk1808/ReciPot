package pl.mk.recipot.notifications.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.Notification;

public class FillNotificationCreationDate {
	public Notification execute(Notification notification) {
		notification.setCreated(new Date());
		return notification;
	}
}
