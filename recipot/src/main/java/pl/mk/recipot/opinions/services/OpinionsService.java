package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.opinions.domains.CreateRecipeOpinions;
import pl.mk.recipot.opinions.dtos.OpinionDto;
import pl.mk.recipot.opinions.repositories.ICommentsRepository;
import pl.mk.recipot.opinions.repositories.IRatingsRepository;

@Service
public class OpinionsService implements IOpinionsService {
	private ICommentsRepository commentRepository;
	private IRatingsRepository ratingsRepository;

	public OpinionsService(ICommentsRepository commentRepository, IRatingsRepository ratingsRepository) {
		super();
		this.commentRepository = commentRepository;
		this.ratingsRepository = ratingsRepository;
	}

	@Override
	public List<OpinionDto> getRecipeOpinions(UUID recipeId) {
		List<Comment> comments = commentRepository.findByRecipeId(recipeId);
		List<Rating> ratings = ratingsRepository.findByRecipeId(recipeId);
		return new CreateRecipeOpinions().execute(comments, ratings);
	}

}
