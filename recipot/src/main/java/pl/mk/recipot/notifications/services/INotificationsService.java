package pl.mk.recipot.notifications.services;

import java.util.Date;
import java.util.List;

import pl.mk.recipot.commons.models.Notification;

public interface INotificationsService {
	List<Notification> getLastNotifications(Date dateSince);
}
