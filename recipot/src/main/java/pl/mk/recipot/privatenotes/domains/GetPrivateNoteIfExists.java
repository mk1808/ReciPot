package pl.mk.recipot.privatenotes.domains;

import java.util.Optional;

import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.models.PrivateNote;

public class GetPrivateNoteIfExists {
	public PrivateNote execute(Optional<PrivateNote> privateNote) {
		if (privateNote.isEmpty()) {
			throw new NotFoundException("Private note not found");
		}
		return privateNote.get();
	}
}
