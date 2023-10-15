package pl.mk.recipot.recipes.helpers;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import pl.mk.recipot.commons.dtos.SearchCriteriaDto;
import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.enums.RecipeAmountOfDishes;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.commons.enums.SearchOperation;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.SharedRecipe;

public class RecipeSpecification implements Specification<Recipe> {

	private SearchCriteriaDto searchCriteria;

	public RecipeSpecification(SearchCriteriaDto searchCriteria) {
		super();
		this.searchCriteria = searchCriteria;
	}

	@Override
	public Predicate toPredicate(Root<Recipe> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		query.distinct(true);
		String strToSearch = searchCriteria.getValue().toString().toLowerCase();

		switch (Objects.requireNonNull(SearchOperation.getSimpleOperation(searchCriteria.getOperation()))) {
		case CONTAINS:
			return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch + "%");

		case DOES_NOT_CONTAIN:
			return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch + "%");

		case BEGINS_WITH:
			return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					strToSearch + "%");

		case DOES_NOT_BEGIN_WITH:
			return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					strToSearch + "%");

		case ENDS_WITH:
			return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch);

		case DOES_NOT_END_WITH:
			return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())),
					"%" + strToSearch);

		case EQUAL:
			if (searchCriteria.getFilterKey().equals("user")) {
				return criteriaBuilder.equal(userJoin(root).<String>get("login"), searchCriteria.getValue());
			}

			if (searchCriteria.getFilterKey().equals("numberOfDishes")) {
				int num = RecipeAmountOfDishes.valueOf((String) searchCriteria.getValue()).ordinal();
				return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), num);
			}
			
			if (searchCriteria.getFilterKey().equals("accessType")) {
				int num = RecipeAccessType.valueOf((String) searchCriteria.getValue()).ordinal();
				return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), num);
			}
			
			if (searchCriteria.getFilterKey().equals("difficulty")) {
				int num = RecipeDifficulty.valueOf((String) searchCriteria.getValue()).ordinal();
				return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), num);
			}
			
			if (searchCriteria.getFilterKey().equals("requiredEffort")) {
				int num = RecipeRequiredEffort.valueOf((String) searchCriteria.getValue()).ordinal();
				return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), num);
			}
			return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), searchCriteria.getValue());

		case NOT_EQUAL:
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
				return criteriaBuilder.and(hashTagsJoin(root).get("id").in(getUuidsList()));
			}
			if (searchCriteria.getFilterKey().equals("categories")) {
				return criteriaBuilder.and(categoriesJoin(root).get("id").in(getUuidsList()));
			}
			if (searchCriteria.getFilterKey().equals("ingredients")) {
				Root<RecipeIngredient> riRoot = query.from(RecipeIngredient.class);
				return criteriaBuilder.and(criteriaBuilder.equal(root.get("id"), riRoot.get("recipe").get("id")),
						riRoot.get("ingredient").get("id").in(getUuidsList()));
			}
			if (searchCriteria.getFilterKey().equals("shared")) {
				Root<SharedRecipe> srRoot = query.from(SharedRecipe.class);
				return criteriaBuilder.and(
					criteriaBuilder.equal(srRoot.get("recipe"), root),
					criteriaBuilder.equal(srRoot.join("receiverUser").get("login"), searchCriteria.getValue())
				);
			}

			return null;
		default:
			break;
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

	private List<UUID> getUuidsList() {
		List<String> uuids = (List<String>) searchCriteria.getValue();
		return uuids.stream().map(UUID::fromString).toList();
	}

}
