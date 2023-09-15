package pl.mk.recipot.commons.enums;

import java.util.Arrays;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;

public enum PredefinedRecipeFilter {

	NEWEST("Newest",
			RecipeSearchDto.builder()
					.dataOption("ALL")
					.searchCriteriaList(Arrays.asList(getPublicPartOfPredefinedFilter()))
					.sortBy("created")
					.sortDirection("desc").build()),
	POPULAR("Popular",
			RecipeSearchDto.builder()
					.dataOption("ALL")
					.searchCriteriaList(Arrays.asList(getPublicPartOfPredefinedFilter()))
					.sortBy("ratingsCount")
					.sortDirection("desc").build());

	private String name;
	private String jsonValue;
	private RecipeSearchDto filter;

	PredefinedRecipeFilter(String name, RecipeSearchDto filter) {
		this.name = name;
		this.filter = filter;
	}

	public String getName() {
		return name;
	}

	public RecipeSearchDto getFilter() {
		return filter;
	}

	private static SearchCriteriaDto getPublicPartOfPredefinedFilter() {
		return SearchCriteriaDto.builder().filterKey("accessType").value("PUBLIC").operation("eq").build();
	}

}
