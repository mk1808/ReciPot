package pl.mk.recipot.statistics.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.statistics.dtos.GeneralStatisticsDto;

@RequestMapping("/api/statistics")
public interface IStatisticsController {

	@GetMapping("/general")
	ResponseEntity<Response<GeneralStatisticsDto>> getGeneralStatistics();

}
