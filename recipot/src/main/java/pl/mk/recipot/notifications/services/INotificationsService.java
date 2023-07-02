package pl.mk.recipot.notifications.services;

import java.util.Date;
import java.util.List;

import pl.mk.recipot.notifications.dtos.NotificationDto;

public interface INotificationsService {
	List<NotificationDto> getLastNotifications(Date dateSince);
}
