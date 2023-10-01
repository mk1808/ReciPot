package pl.mk.recipot.privatenotes.facades;

import java.util.UUID;

public interface IPrivateNotesFacade {

	void deletePrivateNotesByRecipe(UUID recipeId);

}
