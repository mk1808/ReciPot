package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.facades.INotificationsFacade;
import pl.mk.recipot.opinions.domains.ClearCommentFilds;
import pl.mk.recipot.opinions.domains.FillCommentAuthorAndCreationDate;
import pl.mk.recipot.opinions.domains.UpdateComment;
import pl.mk.recipot.opinions.repositories.ICommentsRepository;

@Service
public class CommentsService implements ICrudService<Comment> {

	private ICommentsRepository commentRepository;
	private IAuthFacade authFacade;
	private INotificationsFacade notificationFacade;

	public CommentsService(ICommentsRepository commentRepository, IAuthFacade authFacade, INotificationsFacade notificationFacade) {
		super();
		this.commentRepository = commentRepository;
		this.authFacade = authFacade;
		this.notificationFacade = notificationFacade;
	}

	@Override
	public Comment save(Comment comment) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<Comment> existingRating = commentRepository.findByUserAndRecipe(currentUser, comment.getRecipe());
		Comment savedComment = commentRepository.save(
				existingRating.isEmpty() 
					? new FillCommentAuthorAndCreationDate().execute(comment, currentUser)
					: new UpdateComment().execute(existingRating.get(0), comment));
		notificationFacade.notifyNewRecipeComment(get(savedComment.getId()));
		return new ClearCommentFilds().execute(savedComment);
	}

	@Override
	public Comment update(Comment obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Comment get(UUID id) {
		return commentRepository.findById(id).orElse(null);
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

}
