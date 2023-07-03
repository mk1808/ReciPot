package pl.mk.recipot.recipecollections.domains;

import java.util.ArrayList;
import java.util.List;

import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeCollection;

public class CreateDefaultRecipeCollections {
	private List<RecipeCollection> defaultRecipeCollections = new ArrayList<>();
	private AppUser user;

	public List<RecipeCollection> execute(AppUser user) {
		this.user = user;
		createDefaultRecipeCollections();
		return defaultRecipeCollections;
	}

	private void createDefaultRecipeCollections() {
		for (DefaultRecipeCollections collection : DefaultRecipeCollections.values()) {
			defaultRecipeCollections.add(createDefaultRecipeCollection(collection));
		}
	}

	private RecipeCollection createDefaultRecipeCollection(DefaultRecipeCollections collection) {
		return RecipeCollection.builder().owner(user).name(collection.getName()).canDelete(false).build();
	}
}
