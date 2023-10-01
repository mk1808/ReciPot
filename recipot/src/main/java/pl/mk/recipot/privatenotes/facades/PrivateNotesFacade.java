package pl.mk.recipot.privatenotes.facades;

import java.util.UUID;

import pl.mk.recipot.privatenotes.services.IPrivateNotesService;

public class PrivateNotesFacade implements IPrivateNotesFacade {

	private IPrivateNotesService privateNoteService;

	public PrivateNotesFacade(IPrivateNotesService privateNoteService) {
		super();
		this.privateNoteService = privateNoteService;
	}

	@Override
	public void deletePrivateNotesByRecipe(UUID recipeId) {
		privateNoteService.deleteByRecipe(recipeId);
	}

}
