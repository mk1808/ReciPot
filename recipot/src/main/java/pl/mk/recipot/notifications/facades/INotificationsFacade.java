package pl.mk.recipot.notifications.facades;

import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.models.SharedRecipe;

public interface INotificationsFacade {

	void notifySharedRecipe(SharedRecipe sharedRecipe);

	void notifyNewRecipeRating(Rating rating);

	void notifyNewRecipeComment(Comment comment);

}
