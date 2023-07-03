package pl.mk.recipot.opinions.facades;

import pl.mk.recipot.commons.models.AppUser;

public interface IOpinionsFacade {
	int getUserRatedRecipesCount(AppUser user);

	int getUserCommentedRecipesCount(AppUser user);
}
