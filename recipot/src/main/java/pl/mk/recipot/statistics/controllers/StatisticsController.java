package pl.mk.recipot.statistics.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.statistics.dtos.GeneralStatisticsDto;
import pl.mk.recipot.statistics.dtos.UserStatisticsDto;
import pl.mk.recipot.statistics.services.IStatisticsService;

@RestController
public class StatisticsController implements IStatisticsController {
	private IStatisticsService statisticsService;

	public StatisticsController(IStatisticsService statisticsService) {
		super();
		this.statisticsService = statisticsService;
	}

	@Override
	public ResponseEntity<Response<GeneralStatisticsDto>> getGeneralStatistics() {
		return new OkResponseFactory().createResponse(statisticsService.getGeneralStatistics());
	}

	@Override
	public ResponseEntity<Response<UserStatisticsDto>> getUserStatistics() {
		return new OkResponseFactory().createResponse(statisticsService.getUserStatistics());
	}

}
