package pl.mk.recipot.notifications.services;

import java.util.Date;
import java.util.List;

import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.models.SharedRecipe;

public interface INotificationsService {
	List<Notification> getLastNotifications(Date dateSince);

	void notifySharedRecipe(SharedRecipe sharedRecipe);

	void notifyNewRecipeRating(Rating rating);

	void notifyNewRecipeComment(Comment comment);
}
