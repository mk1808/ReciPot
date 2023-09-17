package pl.mk.recipot.opinions.domains;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.opinions.dtos.OpinionDto;

public class CreateRecipeOpinions {
	Map<AppUser, Comment> userComments = new HashMap<>();
	Map<AppUser, Rating> userRatings = new HashMap<>();
	Set<AppUser> allUsers = new HashSet<>();

	public List<OpinionDto> execute(List<Comment> comments, List<Rating> ratings) {
		proceedComments(comments);
		proceedRatings(ratings);
		return makeOpinions();
	}

	private void proceedComments(List<Comment> comments) {
		for (Comment comment : comments) {
			AppUser author = comment.getAuthor();
			userComments.put(author, comment);
			allUsers.add(author);
		}
	}

	private void proceedRatings(List<Rating> ratings) {
		for (Rating rating : ratings) {
			AppUser author = rating.getAuthor();
			userRatings.put(author, rating);
			allUsers.add(author);
		}
	}

	private List<OpinionDto> makeOpinions() {
		return allUsers.stream().map(this::makeOpinion).toList();
	}

	private OpinionDto makeOpinion(AppUser author) {
		Comment comment = userComments.get(author);
		Rating rating = userRatings.get(author);
		Date opinionCreationDate = getOpionOlderDate(comment, rating);
		
		return OpinionDto.builder()
				.authorLogin(author.getLogin())
				.authorAvatarImageSrc(author.getAvatarImageSrc())
				.comment(getValue(comment))
				.rating(getValue(rating))
				.created(opinionCreationDate)
				.build();

	}

	private Date getOpionOlderDate(Comment comment, Rating rating) {
		Date opinionCreationDate = null;
		if (comment != null) {
			opinionCreationDate = comment.getCreated();
		}
		if (rating != null && rating.getCreated().before(opinionCreationDate)) {
			opinionCreationDate = rating.getCreated();
		}
		return opinionCreationDate;
	}

	private String getValue(Comment comment) {
		return comment != null ? comment.getContent() : null;
	}

	private Double getValue(Rating rating) {
		return rating != null ? rating.getValue() : null;
	}
}
