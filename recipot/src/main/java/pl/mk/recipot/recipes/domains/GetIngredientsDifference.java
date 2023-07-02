package pl.mk.recipot.recipes.domains;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;

public class GetIngredientsDifference {
	public Map<String, List<Ingredient>> execute(Recipe oldRecipe, Recipe newRecipe) {
		Map<String, List<Ingredient>> map = getMap();
		
		List<Ingredient> oldIngredients = new ArrayList<Ingredient>(new GetIngredientsFromRecipe().execute(oldRecipe));
		List<Ingredient> newIngredients = new ArrayList<Ingredient>(new GetIngredientsFromRecipe().execute(newRecipe));
		Map<String, Ingredient> ingredeintsMap = getNameIngredientMap(oldIngredients,newIngredients);
		
		
		List<String> oldIngredientsIds = getList(oldRecipe);
		List<String> newIngredientsIds = getList(newRecipe);
		
		map.get("ADDED").addAll(getDifference(newIngredientsIds, oldIngredientsIds, ingredeintsMap));
		map.get("DELETED").addAll(getDifference(oldIngredientsIds, newIngredientsIds, ingredeintsMap));
		map.get("UDPATED").addAll(getCommon(oldIngredientsIds, newIngredientsIds, ingredeintsMap));
		

		return map;
		
		
	}

	private Map<String, List<Ingredient>> getMap() {
		Map<String, List<Ingredient>> map = new HashMap<>();
		map.put("ADDED", new ArrayList<Ingredient>());
		map.put("DELETED", new ArrayList<Ingredient>());
		map.put("UDPATED", new ArrayList<Ingredient>());
		return map;
	}
	
	private Map<String, Ingredient> getNameIngredientMap(List<Ingredient> oldIngredients, List<Ingredient> newIngredients ) {
		Map<String, Ingredient> map = new HashMap<>();
		oldIngredients.addAll(newIngredients);
	    return oldIngredients.stream().collect(Collectors.toMap(Ingredient::getName, ingredient->ingredient));
	}
	
	private List<String> getList(Recipe recipe){
		Set<Ingredient> ingredients = new GetIngredientsFromRecipe().execute(recipe);

		return ingredients.stream().map(Ingredient::getName).toList();
	}
	
	private List<Ingredient> getDifference(List<String> listOne, List<String> listTwo, Map<String, Ingredient> ingredeintsMap	){
		return listOne.stream()
				.filter(element -> !listTwo.contains(element))
				.map(element->ingredeintsMap.get(element))
				.toList();
	}
	
	private List<Ingredient> getCommon(List<String> listOne, List<String> listTwo, Map<String, Ingredient> ingredeintsMap	){
		return listOne.stream()
				.filter(element -> listTwo.contains(element))
				.map(element->ingredeintsMap.get(element))
				.toList();
	}
	
	

}
