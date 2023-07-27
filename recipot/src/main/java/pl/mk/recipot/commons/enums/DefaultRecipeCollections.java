package pl.mk.recipot.commons.enums;

public enum DefaultRecipeCollections {
	CREATED("Created"), NOTED("Noted"), COMMENTED("Commented"), SHARED_WITH_USER("Shared with you"), FAVOURITE("Favourite");

	private String name;

	DefaultRecipeCollections(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
}
 