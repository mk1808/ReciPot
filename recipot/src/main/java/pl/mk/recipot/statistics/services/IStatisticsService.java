package pl.mk.recipot.statistics.services;

import pl.mk.recipot.statistics.dtos.GeneralStatisticsDto;
import pl.mk.recipot.statistics.dtos.UserStatisticsDto;

public interface IStatisticsService {
	GeneralStatisticsDto getGeneralStatistics();

	UserStatisticsDto getUserStatistics();
}
