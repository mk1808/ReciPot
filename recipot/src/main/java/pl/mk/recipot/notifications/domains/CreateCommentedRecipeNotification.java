package pl.mk.recipot.notifications.domains;

import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.Comment;

public class CreateCommentedRecipeNotification extends AbstractCreateRecipeNotification<Comment> {
	@Override
	protected NotificationType getType() {
		return NotificationType.RECIPE_COMMENTED;
	}

	@Override
	protected Object getValue(Comment comment) {
		return comment.getContent();
	}
}
