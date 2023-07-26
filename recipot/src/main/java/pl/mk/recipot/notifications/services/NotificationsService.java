package pl.mk.recipot.notifications.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.domains.CleanNotificationFields;
import pl.mk.recipot.notifications.domains.CreateSharedRecipeNotification;
import pl.mk.recipot.notifications.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.notifications.domains.FillNotificationCreationDate;
import pl.mk.recipot.notifications.repositories.INotificationsRepository;
import pl.mk.recipot.users.facades.IUsersFacade;

@Service
public class NotificationsService implements INotificationsService, ICrudService<Notification> {
	private INotificationsRepository notificationRepository;
	private IAuthFacade authFacade;
	private IUsersFacade usersFacade;

	public NotificationsService(INotificationsRepository notificationRepository, IAuthFacade authFacade,
			IUsersFacade usersFacade) {
		super();
		this.notificationRepository = notificationRepository;
		this.authFacade = authFacade;
		this.usersFacade = usersFacade;
	}

	@Override
	public Notification save(Notification notification) {
		AppUser notificationOwner = usersFacade.getUserById(notification.getOwner().getId());
		new CheckIfUserIsNotOwner().execute(notificationOwner, notification);
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
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), get(id));
		notificationRepository.deleteById(id);
	}

	@Override
	public List<Notification> getLastNotifications(Date dateSince) {
		List<Notification> notifications = notificationRepository.getLastNotifications(authFacade.getCurrentUser(), dateSince);
		CleanNotificationFields cleaner = new CleanNotificationFields();
		notifications.forEach(cleaner::executte);
		return notifications;
	}

	@Override
	public void notifySharedRecipe(SharedRecipe sharedRecipe) {
		save(new CreateSharedRecipeNotification().execute(sharedRecipe));
	}

	@Override
	public void notifyNewRecipeRating(Rating rating) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void notifyNewRecipeComment(Comment comment) {
		// TODO Auto-generated method stub
		
	}

}
