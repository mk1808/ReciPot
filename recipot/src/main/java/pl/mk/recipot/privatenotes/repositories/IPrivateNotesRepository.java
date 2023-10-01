package pl.mk.recipot.privatenotes.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.PrivateNote;
import pl.mk.recipot.commons.models.Recipe;

public interface IPrivateNotesRepository extends JpaRepository<PrivateNote, UUID> {

	@Query("SELECT pn FROM PrivateNote pn WHERE pn.author = :user and pn.recipe = :recipe")
	List<PrivateNote> findByUserAndRecipe(AppUser user, Recipe recipe);

	@Query("SELECT pn FROM PrivateNote pn WHERE pn.author = :user and pn.recipe.id = :recipeId")
	PrivateNote findByUserAndRecipeId(AppUser user, UUID recipeId);
	
	@Query("SELECT pn FROM PrivateNote pn WHERE pn.recipe.id = :recipeId")
	List<PrivateNote> findByRecipe(UUID recipeId);

	@Modifying
	@Query("DELETE FROM PrivateNote pn WHERE pn.recipe.id = :recipeId")
	void deleteByRecipeId(UUID recipeId);

}
