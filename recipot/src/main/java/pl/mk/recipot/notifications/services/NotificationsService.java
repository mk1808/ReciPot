package pl.mk.recipot.notifications.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.domains.CheckIfUserIsOwner;
import pl.mk.recipot.notifications.domains.FillNotificationCreationDate;
import pl.mk.recipot.notifications.dtos.NotificationDto;
import pl.mk.recipot.notifications.repositories.INotificationsRepository;

@Service
public class NotificationsService implements INotificationsService, ICrudService<Notification> {
	private INotificationsRepository notificationRepository;
	private IAuthFacade authFacade;

	public NotificationsService(INotificationsRepository notificationRepository, IAuthFacade authFacade) {
		super();
		this.notificationRepository = notificationRepository;
		this.authFacade = authFacade;
	}

	@Override
	public Notification save(Notification notification) {
		new FillNotificationCreationDate().execute(notification);
		return notificationRepository.save(notification);
	}

	@Override
	public Notification update(Notification obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Notification get(UUID id) {
		return notificationRepository.findById(id).orElseThrow();
	}

	@Override
	public void delete(UUID id) {
		new CheckIfUserIsOwner().execute(authFacade.getCurrentUser(), get(id));
		notificationRepository.deleteById(id);
	}

	@Override
	public List<NotificationDto> getLastNotifications(Date dateSince) {
		return notificationRepository.getLastNotifications(authFacade.getCurrentUser(), dateSince);
	}

}
