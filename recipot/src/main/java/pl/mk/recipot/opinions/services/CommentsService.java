package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.opinions.domains.ClearCommentFilds;
import pl.mk.recipot.opinions.domains.FillCommentAuthorAndCreationDate;
import pl.mk.recipot.opinions.domains.UpdateComment;
import pl.mk.recipot.opinions.repositories.ICommentsRepository;

@Service
public class CommentsService implements ICrudService<Comment> {

	private ICommentsRepository commentRepository;
	private IAuthFacade authFacade;

	public CommentsService(ICommentsRepository commentRepository, IAuthFacade authFacade) {
		super();
		this.commentRepository = commentRepository;
		this.authFacade = authFacade;
	}

	@Override
	public Comment save(Comment comment) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<Comment> existingRating = commentRepository.findByUserAndRecipe(currentUser, comment.getRecipe());
		if (existingRating.isEmpty()) {
			return new ClearCommentFilds().execute(
					commentRepository.save(new FillCommentAuthorAndCreationDate().execute(comment, currentUser)));
		}
		return new ClearCommentFilds()
				.execute(commentRepository.save(new UpdateComment().execute(existingRating.get(0), comment)));
	}

	@Override
	public Comment update(Comment obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Comment get(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

}
