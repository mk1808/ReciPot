package pl.mk.recipot.notifications.facades;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.notifications.services.INotificationsService;


@Service
public class NotificationsFacade implements INotificationsFacade {

	private INotificationsService notificationService;
	
	public NotificationsFacade(INotificationsService notificationService) {
		this.notificationService = notificationService;
	}
	
	@Override
	public void notifySharedRecipe(SharedRecipe sharedRecipe) {
		notificationService.notifySharedRecipe(sharedRecipe);
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
