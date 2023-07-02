package pl.mk.recipot.opinions.domains;

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
	Map<AppUser, String> userComments = new HashMap<>();
	Map<AppUser, Double> userRatings = new HashMap<>();
	Set<AppUser> allUsers = new HashSet<>();

	public List<OpinionDto> execute(List<Comment> comments, List<Rating> ratings) {
		proceedComments(comments);
		proceedRatings(ratings);
		return makeOpinions();
	}

	private void proceedComments(List<Comment> comments) {
		for (Comment comment : comments) {
			AppUser author = comment.getAuthor();
			userComments.put(author, comment.getContent());
			allUsers.add(author);
		}
	}

	private void proceedRatings(List<Rating> ratings) {
		for (Rating rating : ratings) {
			AppUser author = rating.getAuthor();
			userRatings.put(author, rating.getValue());
			allUsers.add(author);
		}
	}

	private List<OpinionDto> makeOpinions() {
		return allUsers.stream().map(this::makeOpinion).toList();
	}

	private OpinionDto makeOpinion(AppUser author) {
		return OpinionDto.builder()
				.authorLogin(author.getLogin())
				.authorAvatarImageSrc(author.getAvatarImageSrc())
				.comment(userComments.getOrDefault(author, null))
				.rating(userRatings.getOrDefault(author, null))
				.build();

	}
}
