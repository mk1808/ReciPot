package pl.mk.recipot.privatenotes.domains;

import java.util.Optional;

import pl.mk.recipot.commons.models.PrivateNote;

public class GetPrivateNote {
	public PrivateNote execute(Optional<PrivateNote> privateNote) {
		return privateNote.orElse(null);
	}
}
