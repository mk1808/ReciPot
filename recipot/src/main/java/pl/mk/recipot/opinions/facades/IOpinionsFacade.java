package pl.mk.recipot.opinions.facades;

import java.util.UUID;

import pl.mk.recipot.commons.models.AppUser;

public interface IOpinionsFacade {
	int getUserRatedRecipesCount(AppUser user);

	int getUserCommentedRecipesCount(AppUser user);

	void deleteOpinionsByRecipe(UUID id);
}
