package pl.mk.recipot.opinions.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Rating;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.opinions.dtos.RecipeAverageRating;

public interface IRatingsRepository extends JpaRepository<Rating, UUID> {

	@Query("SELECT r FROM Rating r WHERE r.author = :user and r.recipe = :recipe")
	List<Rating> findByUserAndRecipe(AppUser user, Recipe recipe);

	@Query("SELECT r FROM Rating r join fetch r.author WHERE r.recipe.id = :recipeId")
	List<Rating> findByRecipeId(UUID recipeId);
	
	@Query("SELECT count(r) FROM Rating r where r.author = :user ")
	int getUserRatedRecipesCount(AppUser user);
	
	@Query("SELECT count(r) FROM Rating r where r.author = :user ")
	int getRecipeRatingCount(AppUser user);
	
	@Query("SELECT count(r) as ratingsCount, avg(r.value) as averageRating FROM Rating r where r.recipe = :recipe ")
	RecipeAverageRating getRecipeAverageRating(Recipe recipe);
}
