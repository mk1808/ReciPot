package pl.mk.recipot.opinions.domains;

import pl.mk.recipot.commons.models.Comment;

public class UpdateComment {
	public Comment execute(Comment existingComment, Comment changedComment) {
		existingComment.setContent(changedComment.getContent());
		return existingComment;
	}
}
