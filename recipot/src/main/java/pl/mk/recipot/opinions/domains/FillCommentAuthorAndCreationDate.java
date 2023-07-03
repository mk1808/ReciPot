package pl.mk.recipot.opinions.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Comment;

public class FillCommentAuthorAndCreationDate {
	public Comment execute(Comment comment, AppUser author) {
		comment.setAuthor(author);
		comment.setCreated(new Date());
		return comment;
	}
}
