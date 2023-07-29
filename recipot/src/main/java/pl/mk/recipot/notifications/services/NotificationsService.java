package pl.mk.recipot.notifications.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.domains.GetIsUserOwner;
import pl.mk.recipot.commons.domains.SetUserNull;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.domains.CreateCommentedRecipeNotification;
import pl.mk.recipot.notifications.domains.CreateRatedRecipeNotification;
import pl.mk.recipot.notifications.domains.CreateSharedRecipeNotification;
import pl.mk.recipot.notifications.domains.FillNotificationCreationDate;
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
		if (!new GetIsUserOwner().execute(authFacade.getCurrentUser(), notification)) {
			new FillNotificationCreationDate().execute(notification);
			notificationRepository.save(notification);
		}
		return notification;
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
		List<Notification> notifications = notificationRepository.getLastNotifications(authFacade.getCurrentUser(),
				dateSince);
		notifications.forEach(new SetUserNull()::execute);
		return notifications;
	}

	@Override
	public void notifySharedRecipe(SharedRecipe sharedRecipe) {
		save(new CreateSharedRecipeNotification().execute(sharedRecipe));
	}

	@Override
	public void notifyNewRecipeRating(Rating rating) {
		save(new CreateRatedRecipeNotification().execute(rating));
	}

	@Override
	public void notifyNewRecipeComment(Comment comment) {
		save(new CreateCommentedRecipeNotification().execute(comment));
	}

}
