package pl.mk.recipot.recipes.helpers;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.enums.RecipeAmountOfDishes;
import pl.mk.recipot.commons.enums.SearchOperation;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;

public class RecipeSpecification implements Specification<Recipe> {

	private SearchCriteriaDto searchCriteria;

	public RecipeSpecification(SearchCriteriaDto searchCriteria) {
		super();
		this.searchCriteria = searchCriteria;
	}

	@Override
	public Predicate toPredicate(Root<Recipe> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		String strToSearch = searchCriteria.getValue().toString().toLowerCase();

		RecipeAmountOfDishes.valueOf("SMALL").ordinal();

		switch (Objects.requireNonNull(SearchOperation.getSimpleOperation(searchCriteria.getOperation()))) {
		case CONTAINS:
			if (searchCriteria.getFilterKey().equals("a")) {
				return criteriaBuilder.like(
						criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())),
						"%" + strToSearch + "%");
			}

			return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch + "%");

		case DOES_NOT_CONTAIN:
			if (searchCriteria.getFilterKey().equals("deptName")) {
				return criteriaBuilder.notLike(
						criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())),
						"%" + strToSearch + "%");
			}
			return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch + "%");

		case BEGINS_WITH:
			if (searchCriteria.getFilterKey().equals("deptName")) {
				return criteriaBuilder.like(
						criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())),
						strToSearch + "%");
			}
			return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					strToSearch + "%");

		case DOES_NOT_BEGIN_WITH:
			if (searchCriteria.getFilterKey().equals("deptName")) {
				return criteriaBuilder.notLike(
						criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())),
						strToSearch + "%");
			}
			return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					strToSearch + "%");

		case ENDS_WITH:
			if (searchCriteria.getFilterKey().equals("deptName")) {
				return criteriaBuilder.like(
						criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())),
						"%" + strToSearch);
			}
			return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch);

		case DOES_NOT_END_WITH:
			if (searchCriteria.getFilterKey().equals("deptName")) {
				return criteriaBuilder.notLike(
						criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())),
						"%" + strToSearch);
			}
			return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch);

		case EQUAL:
			if (searchCriteria.getFilterKey().equals("user")) {
				System.out.println(searchCriteria.getValue());
				return criteriaBuilder.equal(userJoin(root).<String>get("login"), searchCriteria.getValue());
			}

			if (searchCriteria.getFilterKey().equals("numberOfDishes")) {
				int num = RecipeAmountOfDishes.valueOf((String) searchCriteria.getValue()).ordinal();
				return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), num);
			}
			return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), searchCriteria.getValue());

		case NOT_EQUAL:
			if (searchCriteria.getFilterKey().equals("deptName")) {
				return criteriaBuilder.notEqual(userJoin(root).<String>get(searchCriteria.getFilterKey()),
						searchCriteria.getValue());
			}
			return criteriaBuilder.notEqual(root.get(searchCriteria.getFilterKey()), searchCriteria.getValue());

		case NUL:
			return criteriaBuilder.isNull(root.get(searchCriteria.getFilterKey()));

		case NOT_NULL:
			return criteriaBuilder.isNotNull(root.get(searchCriteria.getFilterKey()));

		case GREATER_THAN:
			if (searchCriteria.getFilterKey().equals("numberOfDishes")) {
				searchCriteria.setValue(RecipeAmountOfDishes.valueOf((String) searchCriteria.getValue()).ordinal());
			}
			return criteriaBuilder.greaterThan(root.<String>get(searchCriteria.getFilterKey()),
					searchCriteria.getValue().toString());

		case GREATER_THAN_EQUAL:
			if (searchCriteria.getFilterKey().equals("numberOfDishes")) {
				int num = RecipeAmountOfDishes.valueOf((String) searchCriteria.getValue()).ordinal();
				return criteriaBuilder.greaterThanOrEqualTo(root.<String>get(searchCriteria.getFilterKey()),
						String.valueOf(num));
			}
			return criteriaBuilder.greaterThanOrEqualTo(root.<String>get(searchCriteria.getFilterKey()),
					searchCriteria.getValue().toString());

		case LESS_THAN:
			if (searchCriteria.getFilterKey().equals("numberOfDishes")) {
				searchCriteria.setValue(RecipeAmountOfDishes.valueOf((String) searchCriteria.getValue()).ordinal());
			}
			return criteriaBuilder.lessThan(root.<String>get(searchCriteria.getFilterKey()),
					searchCriteria.getValue().toString());

		case LESS_THAN_EQUAL:
			if (searchCriteria.getFilterKey().equals("numberOfDishes")) {
				searchCriteria.setValue(RecipeAmountOfDishes.valueOf((String) searchCriteria.getValue()).ordinal());
			}
			return criteriaBuilder.lessThanOrEqualTo(root.get(searchCriteria.getFilterKey()),
					Long.valueOf(searchCriteria.getValue().toString()).intValue());

		case IN:
			if (searchCriteria.getFilterKey().equals("hashTags")) {
				List<String> uuids = (List<String>) searchCriteria.getValue();
				List<UUID> uuidsList = uuids.stream().map(UUID::fromString).toList();

				return criteriaBuilder.and(hashTagsJoin(root).get("id").in(uuidsList));
			}
			if (searchCriteria.getFilterKey().equals("categories")) {
				List<String> uuids = (List<String>) searchCriteria.getValue();
				List<UUID> uuidsList = uuids.stream().map(UUID::fromString).toList();

				return criteriaBuilder.and(categoriesJoin(root).get("id").in(uuidsList));
			}
			if (searchCriteria.getFilterKey().equals("ingredients")) {
				List<String> uuids = (List<String>) searchCriteria.getValue();
				List<UUID> uuidsList = uuids.stream().map(UUID::fromString).toList();

				Root<RecipeIngredient> riRoot = query.from(RecipeIngredient.class);

				return criteriaBuilder.and(criteriaBuilder.equal(root.get("id"), riRoot.get("recipe").get("id")),
						riRoot.get("ingredient").get("id").in(uuidsList));

			}

			return null;
		}

		return null;
	}

	private Join<Recipe, AppUser> userJoin(Root<Recipe> root) {
		return root.join("owner");
	}

	private Join<Recipe, Category> categoriesJoin(Root<Recipe> root) {
		return root.join("categories");
	}

	private Join<Recipe, HashTag> hashTagsJoin(Root<Recipe> root) {
		return root.join("hashTags");
	}

}
