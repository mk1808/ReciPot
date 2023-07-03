package pl.mk.recipot.privatenotes.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.PrivateNote;

public class CheckIfUserIsAuthor {

	public void execute(AppUser user, PrivateNote privateNote) {
		if (!user.getId().equals(privateNote.getAuthor().getId())) {
			throw new ForbiddenException();
		}
	}
}
