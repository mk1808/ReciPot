package pl.mk.recipot.privatenotes.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.PrivateNote;

public class CheckIfUserIsNotAuthor {

	public void execute(AppUser user, PrivateNote privateNote) {
		boolean userIsAuthor = user != null 
				&& privateNote.getAuthor() != null
				&& user.getId().equals(privateNote.getAuthor().getId());
		if (!userIsAuthor) {
			throw new ForbiddenException("privateNotes.error.userNotAuthor");
		}
	}
}
