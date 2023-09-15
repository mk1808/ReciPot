package pl.mk.recipot.commons.enums;

import java.util.Arrays;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.dtos.SearchOrderDto;

public enum PredefinedRecipeFilter {

	NEWEST("Newest", getForNewest()), POPULAR("Popular", getForPopular());

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

	private static SearchOrderDto getDescSortOfField(String fieldName) {
		return SearchOrderDto.builder().fieldName(fieldName).order(SearchOrder.DESC).build();
	}

	private static RecipeSearchDto getForNewest() {
		return RecipeSearchDto.builder()
				.dataOption("ALL")
				.searchCriteriaList(Arrays.asList(getPublicPartOfPredefinedFilter()))
				.searchOrder(getDescSortOfField("created"))
				.build();
	}

	private static RecipeSearchDto getForPopular() {
		return RecipeSearchDto.builder()
				.dataOption("ALL")
				.searchCriteriaList(Arrays.asList(getPublicPartOfPredefinedFilter()))
				.searchOrder(getDescSortOfField("ratingsCount"))
				.build();
	}

}
