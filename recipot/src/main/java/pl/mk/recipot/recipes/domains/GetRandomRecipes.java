package pl.mk.recipot.recipes.domains;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;

import pl.mk.recipot.commons.models.Recipe;

public class GetRandomRecipes {
	public List<Recipe> execute(Page<Recipe> recipePage, int pageSize){
		List<Recipe> recipes = new ArrayList<>(recipePage.getContent());
		Collections.shuffle(recipes);
		if(recipes.size() <= pageSize) {
			return recipes;
		}
		return recipes.subList(0, pageSize);
	}
}
