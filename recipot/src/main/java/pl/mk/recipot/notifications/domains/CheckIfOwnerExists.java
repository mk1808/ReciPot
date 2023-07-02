package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Notification;

public class CheckIfOwnerExists {
	public void execute(AppUser user, Notification notification) {
		if (user == null || !user.getId().equals(notification.getOwner().getId())) {
			throw new ConflictException("Owner user don't exists");
		}
	}
}
