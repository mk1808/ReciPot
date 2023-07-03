package pl.mk.recipot.recipes.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.Recipe;

@Repository
public interface IRecipesRepository extends JpaRepository<Recipe, UUID> {
	
	@Query("SELECT r FROM Recipe r LEFT JOIN FETCH r.owner where r.id = :id")
	Recipe getRecipeWithOwner(UUID id);
	
	@Query("SELECT count(r) FROM Recipe r")
	int getAllRecipesCount();
}
