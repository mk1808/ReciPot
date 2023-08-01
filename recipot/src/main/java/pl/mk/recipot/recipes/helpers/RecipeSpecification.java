package pl.mk.recipot.recipes.helpers;

import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.enums.SearchOperation;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.AppUser;

public class RecipeSpecification implements Specification<Recipe> {

	private SearchCriteriaDto searchCriteria;

	public RecipeSpecification(SearchCriteriaDto searchCriteria) {
		super();
		this.searchCriteria = searchCriteria;
	}

	@Override
	public Predicate toPredicate(Root<Recipe> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

		String strToSearch = searchCriteria.getValue().toString().toLowerCase();

		switch (Objects.requireNonNull(SearchOperation.getSimpleOperation(searchCriteria.getOperation()))) {
		case CONTAINS: {
			if (searchCriteria.getFilterKey().equals("a")) {
				return criteriaBuilder.like(
						criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())),
						"%" + strToSearch + "%");
			}
			return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch + "%");
		}
		}

		return null;
	}

	private Join<Recipe, AppUser> userJoin(Root<Recipe> root) {
		return root.join("appUser");
	}

}
