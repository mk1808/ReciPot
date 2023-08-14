package pl.mk.recipot.recipes.domains;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.recipes.helpers.RecipeSpecificationBuilder;

public class SearchRecipesByCriteria {
	public Specification<Recipe> execute(RecipeSearchDto recipeSearchDto) {
		RecipeSpecificationBuilder builder = new RecipeSpecificationBuilder();
		List<SearchCriteriaDto> criteriaList = recipeSearchDto.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(criteria -> {
				criteria.setDataOption(recipeSearchDto.getDataOption());
				builder.with(criteria);
			});
		}
		return builder.build();
	}
}
