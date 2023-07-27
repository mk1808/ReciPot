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
import pl.mk.recipot.opinions.domains.UpdateOrCreateNewComment;
import pl.mk.recipot.opinions.repositories.ICommentsRepository;
import pl.mk.recipot.recipes.facades.IRecipesFacade;

@Service
public class CommentsService implements ICrudService<Comment> {

	private ICommentsRepository commentRepository;
	private IAuthFacade authFacade;
	private INotificationsFacade notificationFacade;
	private IRecipesFacade recipesFacade;

	public CommentsService(ICommentsRepository commentRepository, IAuthFacade authFacade,
			INotificationsFacade notificationFacade, IRecipesFacade recipesFacade) {
		super();
		this.commentRepository = commentRepository;
		this.authFacade = authFacade;
		this.notificationFacade = notificationFacade;
		this.recipesFacade = recipesFacade;
	}

	@Override
	public Comment save(Comment comment) {
		comment.setRecipe(recipesFacade.get(comment.getRecipe().getId()));
		Comment savedComment = updateOrCreateNew(comment);
		notificationFacade.notifyNewRecipeComment(savedComment);
		return new ClearCommentFilds().execute(savedComment);
	}

	public Comment updateOrCreateNew(Comment comment) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<Comment> existingRating = commentRepository.findByUserAndRecipe(currentUser, comment.getRecipe());
		return commentRepository.save(new UpdateOrCreateNewComment().execute(currentUser, existingRating, comment));
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
