package pl.mk.recipot.recipes.domains;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;

public class GetPageForSearching {
	public PageRequest execute(RecipeSearchDto recipeSearchDto) {
		return PageRequest
				.of(recipeSearchDto.page, recipeSearchDto.size, 
						Sort.by("name")
						.ascending()
						.and(Sort.by("id"))
						.ascending());	
	}
}
