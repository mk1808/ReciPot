package pl.mk.recipot.recipes.helpers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.enums.SearchOperation;
import pl.mk.recipot.commons.models.Recipe;

public class RecipeSpecificationBuilder {
	private final List<SearchCriteriaDto> params;
	private final List<SearchCriteriaDto> restrictionParams;

	public RecipeSpecificationBuilder() {
		this.params = new ArrayList<>();
		this.restrictionParams = new ArrayList<>();
	}

	public final RecipeSpecificationBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteriaDto(key, operation, value));
		return this;
	}

	public final RecipeSpecificationBuilder withRestriction(String key, String operation, Object value) {
		restrictionParams.add(new SearchCriteriaDto(key, operation, value));
		return this;
	}

	public final RecipeSpecificationBuilder with(SearchCriteriaDto searchCriteria) {
		params.add(searchCriteria);
		return this;
	}

	public Specification<Recipe> build() {
		return buildRestrictionParameters().and(buildBasicParameters());
	}

	private Specification<Recipe> buildBasicParameters() {
		if (params.size() == 0) {
			return null;
		}

		Specification<Recipe> result = new RecipeSpecification(params.get(0));
		for (int idx = 1; idx < params.size(); idx++) {
			SearchCriteriaDto criteria = params.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ANY
					? result.or(new RecipeSpecification(criteria))
					: result.and(new RecipeSpecification(criteria));
		}
		return result;
	}

	private Specification<Recipe> buildRestrictionParameters() {
		Specification<Recipe> result = new RecipeSpecification(restrictionParams.get(0));
		for (int idx = 1; idx < restrictionParams.size(); idx++) {
			SearchCriteriaDto criteria = restrictionParams.get(idx);
			result = result.or(new RecipeSpecification(criteria));
		}
		return result;
	}

}
