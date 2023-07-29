package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;

public class CheckIfUserDoesNotExists {

	public void execute(AppUser user) {
		if (user == null) {
			throw new ForbiddenException("users.error.userNotFound");
		}
	}

}