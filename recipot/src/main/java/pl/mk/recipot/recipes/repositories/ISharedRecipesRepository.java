package pl.mk.recipot.recipes.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.SharedRecipe;

public interface ISharedRecipesRepository extends JpaRepository<SharedRecipe, UUID> {

	@Query("SELECT sr FROM SharedRecipe sr where sr.recipe = :recipe and sr.receiverUser = :user")
	public List<SharedRecipe> findRecipesSharedWithUser(Recipe recipe, AppUser user);
}
