package pl.mk.recipot.recipes.domains;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.recipes.helpers.RecipeSpecificationBuilder;

public class SearchRecipesByCriteria {
	
	private final RecipeSpecificationBuilder builder = new RecipeSpecificationBuilder();
	private AppUser user;
	
	public Specification<Recipe> execute(RecipeSearchDto recipeSearchDto) {
		addBasicFilterParams(recipeSearchDto);
		addRestrictionParams();
		return builder.build();
	}
	
	public SearchRecipesByCriteria forUser(AppUser user) {
		this.user = user;
		return this;
	}
	
	private void addBasicFilterParams(RecipeSearchDto recipeSearchDto) {
		List<SearchCriteriaDto> criteriaList = recipeSearchDto.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(criteria -> {
				criteria.setDataOption(recipeSearchDto.getDataOption());
				builder.with(criteria);
			});
		}
	}
	
	private void addRestrictionParams() {
		if(user != null) {
			builder.withRestriction("user", "eq", user.getLogin());
			builder.withRestriction("shared", "in", user.getLogin());	
		}
		builder.withRestriction("accessType", "eq", RecipeAccessType.PUBLIC.toString());
	}
}
