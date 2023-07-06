package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.models.Notification;

public class CleanNotificationFields {
	public Notification executte(Notification notification) {
		notification.setOwner(null);
		return notification;
	}
}
