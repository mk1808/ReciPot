package pl.mk.recipot.recipes.domains;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import pl.mk.recipot.commons.enums.ChangeType;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class GetIngredientsDifference {
	public Map<ChangeType, List<RecipeIngredient>> execute(List<RecipeIngredient> existingRecipeIngredients,
			List<RecipeIngredient> newRecipeIngredients) {
		Map<ChangeType, List<RecipeIngredient>> map = getMap();

		Map<String, RecipeIngredient> ingredientsMap = getNameIngredientMap(existingRecipeIngredients,
				newRecipeIngredients);

		List<String> oldIngredientsIds = getNameList(existingRecipeIngredients);
		List<String> newIngredientsIds = getNameList(newRecipeIngredients);

		map.get(ChangeType.ADDED).addAll(getDifference(newIngredientsIds, oldIngredientsIds, ingredientsMap));
		map.get(ChangeType.DELETED).addAll(getDifference(oldIngredientsIds, newIngredientsIds, ingredientsMap));
		map.get(ChangeType.UPDATED).addAll(getCommon(oldIngredientsIds, newIngredientsIds, ingredientsMap));

		return map;
	}

	private Map<ChangeType, List<RecipeIngredient>> getMap() {
		Map<ChangeType, List<RecipeIngredient>> map = new HashMap<>();
		map.put(ChangeType.ADDED, new ArrayList<>());
		map.put(ChangeType.DELETED, new ArrayList<>());
		map.put(ChangeType.UPDATED, new ArrayList<>());
		return map;
	}

	private Map<String, RecipeIngredient> getNameIngredientMap(List<RecipeIngredient> oldIngredients,
			List<RecipeIngredient> newIngredients) {
		Map<String, RecipeIngredient> ingredientsMap = newIngredients.stream().collect(Collectors.toMap(
				recipeIngredient -> recipeIngredient.getIngredient().getName(), recipeIngredient -> recipeIngredient));
		for (RecipeIngredient recipeIngredient : oldIngredients) {
			String ingredientName = recipeIngredient.getIngredient().getName();
			if (!ingredientsMap.containsKey(ingredientName)) {
				ingredientsMap.put(ingredientName, recipeIngredient);
			}
		}
		return ingredientsMap;
	}

	private List<String> getNameList(List<RecipeIngredient> recipeIngredients) {
		return new GetRecipeIngredientsNames()
				.execute(new GetIngredientsFromRecipeIngredients().execute(recipeIngredients));
	}

	private List<RecipeIngredient> getDifference(List<String> listOne, List<String> listTwo,
			Map<String, RecipeIngredient> ingredientsMap) {
		return listOne.stream()
				.filter(element -> !listTwo.contains(element))
				.map(ingredientsMap::get)
				.toList();
	}

	private List<RecipeIngredient> getCommon(List<String> listOne, List<String> listTwo,
			Map<String, RecipeIngredient> ingredientsMap) {
		return listOne.stream()
				.filter(listTwo::contains)
				.map(ingredientsMap::get)
				.toList();
	}

}
