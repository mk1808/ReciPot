package pl.mk.recipot.savedrecipefilters.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeFilter;

public interface ISavedRecipeFiltersRepository extends JpaRepository<RecipeFilter, UUID> {

	@Query("SELECT rf FROM RecipeFilter rf WHERE rf.owner = :user and rf.name = :name")
	List<RecipeFilter> findByUserAndName(AppUser user, String name);

	@Query("SELECT rf FROM RecipeFilter rf WHERE rf.owner = :user")
	List<RecipeFilter> findByUser(AppUser user);

}