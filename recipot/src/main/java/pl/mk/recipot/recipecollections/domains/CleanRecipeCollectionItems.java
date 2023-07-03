package pl.mk.recipot.recipecollections.domains;

import java.util.List;

import pl.mk.recipot.commons.models.RecipeCollectionItem;

public class CleanRecipeCollectionItems {
	public List<RecipeCollectionItem> execute(List<RecipeCollectionItem> items){
		return items.stream().map(item->
		{
			item.setRecipe(null); 
			return item;
		}).toList();
	}

}
