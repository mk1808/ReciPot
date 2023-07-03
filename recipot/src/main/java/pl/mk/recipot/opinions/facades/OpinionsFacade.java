package pl.mk.recipot.opinions.facades;

import org.springframework.stereotype.Component;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.opinions.services.IOpinionsService;

@Component
public class OpinionsFacade implements IOpinionsFacade {
	private IOpinionsService opinionService;

	public OpinionsFacade(IOpinionsService opinionService) {
		super();
		this.opinionService = opinionService;
	}

	@Override
	public int getUserRatedRecipesCount(AppUser user) {
		return opinionService.getUserRatedRecipesCount(user);
	}

	@Override
	public int getUserCommentedRecipesCount(AppUser user) {
		return opinionService.getUserCommentedRecipesCount(user);
	}

}
