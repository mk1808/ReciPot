package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Notification;

public class CheckIfUserIsNotOwner {
	public void execute(AppUser user, Notification notification) {
		boolean userIsOwner = user != null && user.getId().equals(notification.getOwner().getId());
		if (!userIsOwner) {
			throw new ConflictException("notifications.error.userNotExists");
		}
	}
}
