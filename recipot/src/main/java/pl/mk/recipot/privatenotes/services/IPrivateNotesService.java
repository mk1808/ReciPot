package pl.mk.recipot.privatenotes.services;

import java.util.UUID;

import pl.mk.recipot.commons.models.PrivateNote;

public interface IPrivateNotesService {

	public PrivateNote getByRecipe(UUID recipeId);
}
