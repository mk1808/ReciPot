package pl.mk.recipot.opinions.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Comment;
import pl.mk.recipot.commons.models.Recipe;

public interface ICommentsRepository extends JpaRepository<Comment, UUID> {

	@Query("SELECT c FROM Comment c WHERE c.author = :user and c.recipe = :recipe")
	List<Comment> findByUserAndRecipe(AppUser user, Recipe recipe);

	@Query("SELECT c FROM Comment c join fetch c.author WHERE c.recipe.id = :recipeId")
	List<Comment> findByRecipeId(UUID recipeId);

	@Query("SELECT count(c) FROM Comment c where c.author = :user ")
	int getUserCommentedRecipesCount(AppUser user);
}
