package pl.mk.recipot.statistics.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserStatisticsDto {
	private int createdRecipesCount;
	private int commentedRecipesCount;
	private int ratedRecipesCount;
	private int userRecipeCollectionsCount;
	private int recipesInUserRecipeCollectionsCount;
}
