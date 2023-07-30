package pl.mk.recipot.privatenotes.domains;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.PrivateNote;

public class CheckIfPrivateNoteDoesNotExists {
	public void execute(PrivateNote privateNote) {
		if (privateNote == null) {
			throw new NotFoundException("privateNotes.error.noteNotFound");
		}
	}
}
