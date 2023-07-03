package pl.mk.recipot.statistics.services;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.opinions.facades.IOpinionsFacade;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.facades.IRecipesFacade;
import pl.mk.recipot.statistics.dtos.GeneralStatisticsDto;
import pl.mk.recipot.statistics.dtos.UserStatisticsDto;
import pl.mk.recipot.users.facades.IUsersFacade;

@Service
public class StatisticsService implements IStatisticsService {
	private IRecipesFacade recipesFacade;
	private IUsersFacade usersFacade;
	private IRecipeCollectionsFacade recipeCollectionsFacade;
	private IAuthFacade authFacade;
	private IOpinionsFacade opinionsFacade;

	public StatisticsService(IRecipesFacade recipesFacade, IUsersFacade usersFacade,
			IRecipeCollectionsFacade recipeCollectionsFacade, IAuthFacade authFacade, IOpinionsFacade opinionsFacade) {
		super();
		this.recipesFacade = recipesFacade;
		this.usersFacade = usersFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
		this.authFacade = authFacade;
		this.opinionsFacade = opinionsFacade;
	}

	@Override
	public GeneralStatisticsDto getGeneralStatistics() {
		return GeneralStatisticsDto.builder()
				.recipesCount(recipesFacade.getAllRecipesCount())
				.usersCount(usersFacade.getAllUsersCount())
				.allRecipeCollectionsCount(recipeCollectionsFacade.getAllRecipeCollectionsCount())
				.build();
	}

	@Override
	public UserStatisticsDto getUserStatistics() {
		AppUser currentUser = authFacade.getCurrentUser();
		return UserStatisticsDto.builder()
				.createdRecipesCount(recipesFacade.getUserRecipesCount(currentUser))
				.commentedRecipesCount(opinionsFacade.getUserCommentedRecipesCount(currentUser))
				.ratedRecipesCount(opinionsFacade.getUserRatedRecipesCount(currentUser))
				.userRecipeCollectionsCount(recipeCollectionsFacade.getUserRecipeCollectionsCount(currentUser))
				.recipesInUserRecipeCollectionsCount(recipeCollectionsFacade.getRecipesInUserRecipeCollectionsCount(currentUser))
				.build();
	}

}
