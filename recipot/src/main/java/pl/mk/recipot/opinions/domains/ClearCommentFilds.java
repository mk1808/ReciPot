package pl.mk.recipot.opinions.domains;

import pl.mk.recipot.commons.models.Comment;

public class ClearCommentFilds {
	public Comment execute(Comment comment) {
		if (comment == null) {
			return null;
		}
		comment.setRecipe(null);
		return comment;
	}
}
