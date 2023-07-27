package pl.mk.recipot.opinions.domains;

import java.util.List;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Comment;

public class UpdateOrCreateNewComment {
	public Comment execute(AppUser currentUser, List<Comment> existingComment, Comment updatedComment) {
		if (existingComment.isEmpty()) {
			return getNew(currentUser, updatedComment);
		}
		return update(currentUser, existingComment, updatedComment);
	}

	private Comment getNew(AppUser currentUser, Comment updatedComment) {
		return new FillCommentAuthorAndCreationDate().execute(updatedComment, currentUser);
	}

	private Comment update(AppUser currentUser, List<Comment> existingComment, Comment updatedComment) {
		return new UpdateComment().execute(existingComment.get(0), updatedComment);
	}
}
