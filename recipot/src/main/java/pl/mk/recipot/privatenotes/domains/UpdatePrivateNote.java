package pl.mk.recipot.privatenotes.domains;

import pl.mk.recipot.commons.models.PrivateNote;

public class UpdatePrivateNote {
	public PrivateNote execute(PrivateNote existingPrivateNote, PrivateNote changedPrivateNote) {
		existingPrivateNote.setContent(changedPrivateNote.getContent());
		return existingPrivateNote;
	}
}
