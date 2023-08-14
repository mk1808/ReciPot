package pl.mk.recipot.recipes.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

@Repository
public interface IRecipeIngredientsRepository extends JpaRepository<RecipeIngredient, UUID> {

	@Query("SELECT ri FROM RecipeIngredient ri LEFT JOIN FETCH ri.recipe "
			+ "LEFT JOIN FETCH ri.ingredient WHERE ri.recipe.id = :recipeId AND ri.ingredient.name = :ingredientName")
	Recipe getByRecipeAndIngredient(UUID recipeId, String ingredientName);

	@Query("SELECT ri FROM RecipeIngredient ri LEFT JOIN FETCH ri.recipe "
			+ "LEFT JOIN FETCH ri.ingredient WHERE ri.recipe.id = :recipeId "
			+ "AND ri.ingredient.name in (:ingredientNames)")
	List<RecipeIngredient> getByRecipeAndIngredients(UUID recipeId, List<String> ingredientNames);

	@Query("SELECT ri FROM RecipeIngredient ri " + "LEFT JOIN FETCH ri.recipe " + "LEFT JOIN FETCH ri.ingredient "
			+ "WHERE ri.recipe = :recipe")
	List<RecipeIngredient> getByRecipe(Recipe recipe);
}
