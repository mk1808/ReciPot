package pl.mk.recipot.recipes.domains;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;

public class GetPageForSearching {
	public PageRequest execute(int pageNum, int pageSize, RecipeSearchDto recipeSearchDto) {
		return PageRequest
				.of(pageNum, pageSize, 
						Sort.by("name")
						.ascending()
						.and(Sort.by("id"))
						.ascending());	
	}
}
