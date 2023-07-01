package pl.mk.recipot.dictionaries.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.dictionaries.dtos.IngredientsFilterDto;

public interface IIngredientsRepository extends JpaRepository<Ingredient, UUID> {
	@Query("SELECT i FROM Ingredient i WHERE i.name LIKE %:#{#filterObject.name}%")
	Page<Ingredient> findByFilter(IngredientsFilterDto filterObject, Pageable pageable);
}
