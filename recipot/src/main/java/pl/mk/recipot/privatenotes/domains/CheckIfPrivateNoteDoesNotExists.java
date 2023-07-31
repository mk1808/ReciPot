package pl.mk.recipot.privatenotes.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.NotFoundException;

public class CheckIfPrivateNoteDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new NotFoundException("privateNotes.error.noteNotFound");
	}
}
