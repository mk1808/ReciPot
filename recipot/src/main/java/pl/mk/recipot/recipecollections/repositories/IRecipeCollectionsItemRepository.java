package pl.mk.recipot.recipecollections.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollectionItem;

@Repository
public interface IRecipeCollectionsItemRepository extends JpaRepository<RecipeCollectionItem, UUID> {

	@Query("SELECT rc FROM RecipeCollectionItem rc LEFT JOIN FETCH rc.recipe LEFT JOIN FETCH rc.collection "
			+ "where rc.collection.id = :collectionId and rc.recipe.id = :recipeId")
	RecipeCollectionItem getByRecipeAndCollection(UUID collectionId, UUID recipeId);

	@Query("SELECT rci FROM RecipeCollectionItem rci LEFT JOIN FETCH rci.collection " + "where rci.collection.id = :id")
	List<RecipeCollectionItem> getByCollection(UUID id);

	@Query("SELECT count(rci) FROM RecipeCollectionItem rci where rci.collection.owner = :user")
	int getRecipesInUserRecipeCollectionsCount(AppUser user);
}
