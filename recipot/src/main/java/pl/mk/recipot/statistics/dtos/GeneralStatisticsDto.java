package pl.mk.recipot.statistics.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GeneralStatisticsDto {
	private int recipesCount;
	private int usersCount;
	private int allRecipeCollectionsCount;
}
