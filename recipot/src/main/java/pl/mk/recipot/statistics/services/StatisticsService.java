package pl.mk.recipot.statistics.services;

import org.springframework.stereotype.Service;

import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.facades.IRecipesFacade;
import pl.mk.recipot.statistics.dtos.GeneralStatisticsDto;
import pl.mk.recipot.users.facades.IUsersFacade;

@Service
public class StatisticsService implements IStatisticsService {
	private IRecipesFacade recipesFacade;
	private IUsersFacade usersFacade;
	private IRecipeCollectionsFacade recipeCollectionsFacade;

	public StatisticsService(IRecipesFacade recipesFacade, IUsersFacade usersFacade,
			IRecipeCollectionsFacade recipeCollectionsFacade) {
		super();
		this.recipesFacade = recipesFacade;
		this.usersFacade = usersFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
	}

	@Override
	public GeneralStatisticsDto getGeneralStatistics() {
		return GeneralStatisticsDto.builder()
				.recipesCount(recipesFacade.getAllRecipesCount())
				.usersCount(usersFacade.getAllUsersCount())
				.allRecipeCollectionsCount(recipeCollectionsFacade.getAllRecipeCollectionsCount())
				.build();
	}

}
