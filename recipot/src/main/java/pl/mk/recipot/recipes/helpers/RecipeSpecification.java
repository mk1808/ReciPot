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
		case CONTAINS:
            if(searchCriteria.getFilterKey().equals("a")){
                return criteriaBuilder.like(criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())), "%" + strToSearch + "%");
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch + "%");

        case DOES_NOT_CONTAIN:
            if(searchCriteria.getFilterKey().equals("deptName")){
                return criteriaBuilder.notLike(criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())), "%" + strToSearch + "%");
            }
            return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch + "%");

        case BEGINS_WITH:
            if(searchCriteria.getFilterKey().equals("deptName")){
                return criteriaBuilder.like(criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())), strToSearch + "%");
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())), strToSearch + "%");

        case DOES_NOT_BEGIN_WITH:
            if(searchCriteria.getFilterKey().equals("deptName")){
                return criteriaBuilder.notLike(criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())), strToSearch + "%");
            }
            return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())), strToSearch + "%");

        case ENDS_WITH:
            if(searchCriteria.getFilterKey().equals("deptName")){
                return criteriaBuilder.like(criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())), "%" + strToSearch);
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch);

        case DOES_NOT_END_WITH:
            if(searchCriteria.getFilterKey().equals("deptName")){
                return criteriaBuilder.notLike(criteriaBuilder.lower(userJoin(root).<String>get(searchCriteria.getFilterKey())), "%" + strToSearch);
            }
            return criteriaBuilder.notLike(criteriaBuilder.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch);

        case EQUAL:
            if(searchCriteria.getFilterKey().equals("deptName")){
                System.out.println(searchCriteria.getValue());
                return criteriaBuilder.equal(userJoin(root).<String>get(searchCriteria.getFilterKey()), searchCriteria.getValue());
            }
            return criteriaBuilder.equal(root.get(searchCriteria.getFilterKey()), searchCriteria.getValue());

        case NOT_EQUAL:
            if(searchCriteria.getFilterKey().equals("deptName")){
                return criteriaBuilder.notEqual(userJoin(root).<String>get(searchCriteria.getFilterKey()), searchCriteria.getValue() );
            }
            return criteriaBuilder.notEqual(root.get(searchCriteria.getFilterKey()), searchCriteria.getValue());

        case NUL:
            return criteriaBuilder.isNull(root.get(searchCriteria.getFilterKey()));

        case NOT_NULL:
            return criteriaBuilder.isNotNull(root.get(searchCriteria.getFilterKey()));

        case GREATER_THAN:
            return criteriaBuilder.greaterThan(root.<String> get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());

        case GREATER_THAN_EQUAL:
            return criteriaBuilder.greaterThanOrEqualTo(root.<String> get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());

        case LESS_THAN:
            return criteriaBuilder.lessThan(root.<String> get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());

        case LESS_THAN_EQUAL:
            return criteriaBuilder.lessThanOrEqualTo(root.<String> get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());
		}

		return null;
	}

	private Join<Recipe, AppUser> userJoin(Root<Recipe> root) {
		return root.join("appUser");
	}

}
