package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Notification;

public class ShouldCreateNotificationForUser {
	public boolean execute(AppUser user, Notification notification) {
		return user != null && !user.getId().equals(notification.getOwner().getId());
	}
}
