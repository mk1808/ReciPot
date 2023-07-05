package pl.mk.recipot.recipes.domains;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import org.springframework.data.util.StreamUtils;

import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class UpdateExistingIngredients {
	
	public List<RecipeIngredient> execute(List<RecipeIngredient> recipeIngredientsToUpdate,
			List<RecipeIngredient> fromRecipe, Recipe recipe) {
		List<UUID> idsToUpdate = getIdsToUpdate(recipeIngredientsToUpdate);
		List<RecipeIngredient> fromRecipeFiltered = fromRecipe.stream().filter(r -> idsToUpdate.contains(r.getId()))
				.toList();

		return StreamUtils
				.zip(
						recipeIngredientsToUpdate.stream().sorted(sort()),
						fromRecipeFiltered.stream().sorted(sort()), 
						this::updateSingle
				)
				.toList();

	}
		
		private Comparator<? super RecipeIngredient> sort() {
			return Comparator.comparing(RecipeIngredient::getId);
		}
		
		List<UUID> getIdsToUpdate(List<RecipeIngredient> recipeIngredients){
			return recipeIngredients.stream().map(RecipeIngredient::getId).toList();
		}
		
		private RecipeIngredient updateSingle(RecipeIngredient existingRI, RecipeIngredient newRI) {
			existingRI.setAmount(newRI.getAmount());
			existingRI.setUnit(newRI.getUnit());
			return existingRI;
		}
	

}
