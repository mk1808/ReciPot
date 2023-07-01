package pl.mk.recipot.notifications.controllers;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.dtos.NotificationDto;
import pl.mk.recipot.notifications.services.INotificationsService;

@RestController
public class NotificationsController implements INotificationsController {
	private ICrudService<Notification> notificationsCrudService;
	private INotificationsService notificationsService;

	public NotificationsController(ICrudService<Notification> notificationsCrudService,
			INotificationsService notificationsService) {
		super();
		this.notificationsCrudService = notificationsCrudService;
		this.notificationsService = notificationsService;
	}

	@Override
	public List<NotificationDto> getLastNotifications(Date dateSince) {
		return notificationsService.getLastNotifications(dateSince);
	}

	@Override
	public Notification createNotification(Notification notification) {
		return notificationsCrudService.save(notification);
	}

	@Override
	public ResponseEntity<Response<Void>> deleteNotification(UUID notificationId) {
		notificationsCrudService.delete(notificationId);
		return null;
	}

}
