package pl.mk.recipot.recipecollections.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

@Repository
public interface IRecipeCollectionItemRepository extends JpaRepository<RecipeCollectionItem, UUID>{
	
	
	
	@Query("SELECT rci FROM RecipeCollectionItem rci LEFT JOIN FETCH rci.collection "
			+ "where rci.collection.id = :id")
	List<RecipeCollectionItem> getByCollection(UUID id);
}
