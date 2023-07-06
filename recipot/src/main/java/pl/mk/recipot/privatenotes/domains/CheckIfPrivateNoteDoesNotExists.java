package pl.mk.recipot.privatenotes.domains;

import java.util.Optional;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.PrivateNote;

public class CheckIfPrivateNoteDoesNotExists {
	public void execute(Optional<PrivateNote> privateNote) {
		if (privateNote.isEmpty()) {
			throw new NotFoundException("privateNotes.error.noteNotFound");
		}
	}
}
