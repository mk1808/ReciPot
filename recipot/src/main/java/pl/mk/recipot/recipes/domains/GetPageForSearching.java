package pl.mk.recipot.recipes.domains;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.enums.SearchOrder;

public class GetPageForSearching {
	public PageRequest execute(RecipeSearchDto recipeSearchDto) {
		String fieldName = recipeSearchDto.getSearchOrder().getFieldName();
		Sort sort = Sort.by(fieldName != null ? fieldName : "name");
		Sort sortWithOrder = recipeSearchDto.getSearchOrder().getOrder() == SearchOrder.ASC ? sort.ascending()
				: sort.descending();

		return PageRequest.of(recipeSearchDto.page, recipeSearchDto.size, sortWithOrder);
	}
}
