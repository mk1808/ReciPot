package pl.mk.recipot.commons.enums;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;

public enum PredefinedRecipeFilter {
	
	
	NEWEST("Newest", RecipeSearchDto.builder().sortBy("created").sortDirection("desc").build()),
	POPULAR("Popular", RecipeSearchDto.builder().sortBy("ratingsCount").sortDirection("desc").build());
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

}
