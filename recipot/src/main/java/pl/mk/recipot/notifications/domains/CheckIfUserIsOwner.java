package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Notification;

public class CheckIfUserIsOwner {

	public void execute(AppUser user, Notification notification) {
		if (!user.getId().equals(notification.getOwner().getId())) {
			throw new RuntimeException();
		}
	}
}
