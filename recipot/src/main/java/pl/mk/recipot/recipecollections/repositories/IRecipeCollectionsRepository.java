package pl.mk.recipot.recipecollections.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;

@Repository
public interface IRecipeCollectionsRepository extends JpaRepository<RecipeCollection, UUID>{

	@Query("SELECT rc FROM RecipeCollection rc LEFT JOIN FETCH rc.owner "
			+ "where rc.name = :name and rc.owner.id = :userId")
	RecipeCollection getOwnByNameAndUser(String name, UUID userId);

}
