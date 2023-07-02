package pl.mk.recipot.recipes.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.RecipeIngredient;

@Repository
public interface IRecipeIngredientsRepository extends JpaRepository<RecipeIngredient, UUID> {

}
