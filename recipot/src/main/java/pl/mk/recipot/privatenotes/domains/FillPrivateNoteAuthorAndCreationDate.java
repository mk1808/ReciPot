package pl.mk.recipot.privatenotes.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.PrivateNote;

public class FillPrivateNoteAuthorAndCreationDate {
	public PrivateNote execute(PrivateNote privateNote, AppUser author) {
		privateNote.setAuthor(author);
		privateNote.setCreated(new Date());
		return privateNote;
	}
}
