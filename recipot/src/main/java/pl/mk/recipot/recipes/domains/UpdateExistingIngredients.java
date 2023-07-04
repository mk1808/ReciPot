package pl.mk.recipot.recipes.domains;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.data.util.Pair;
import org.springframework.data.util.StreamUtils;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class UpdateExistingIngredients {
	
		public List<RecipeIngredient> execute(List<RecipeIngredient> recipeIngredientsToUpdate, 
				List<RecipeIngredient> fromRecipe, Recipe recipe){
			List<UUID> idsToUpdate = getIdsToUpdate(recipeIngredientsToUpdate);
			List<RecipeIngredient> fromRecipeFiltered = fromRecipe.stream()
					.filter(r->idsToUpdate.contains(r.getId())).toList();
			 Stream<RecipeIngredient> stream = StreamUtils.zip(
					 recipeIngredientsToUpdate.stream().sorted(sort()),
					 fromRecipeFiltered.stream().sorted(sort()),
					  (ri1, ri2) -> updateSingle(ri1, ri2));
			 List<RecipeIngredient> toSave = stream.toList();
			 
			 return toSave;
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
