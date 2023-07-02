package pl.mk.recipot.recipes.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.Recipe;

@Repository
public interface IRecipesRepository extends JpaRepository<Recipe, UUID> {

}
