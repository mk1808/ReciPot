package pl.mk.recipot.recipes.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeStep;

@Repository
public interface IRecipeStepsRepository extends JpaRepository<RecipeStep, UUID> {
	List<RecipeStep> getByRecipe(Recipe recipe);
	
	@Modifying
	@Query("DELETE FROM RecipeStep rs where rs.recipe.id=:recipeId")
	void deleteByRecipeId(UUID recipeId);
}
