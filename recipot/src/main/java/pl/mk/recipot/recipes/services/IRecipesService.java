package pl.mk.recipot.recipes.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import pl.mk.recipot.commons.enums.PredefinedRecipeFilter;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;

public interface IRecipesService {

	public void changeVisibility(UUID recipeId);

	public int getAllRecipesCount();

	int getUserRecipesCount(AppUser user);

	public Recipe updateRecipeAverageRating(Recipe recipe);

	public Page<Recipe> getByPredefinedFilter(PredefinedRecipeFilter type, int pageNum, int pageSize);

	public List<Recipe> getRandomRecipes(int pageSize);

}
