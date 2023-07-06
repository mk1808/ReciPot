package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.exceptions.BadRequestException;
import pl.mk.recipot.commons.models.AppUser;

public class CheckIfUserDoesNotExists {
	
	public void execute(AppUser user) {
		if (user == null) {
			throw new BadRequestException("auth.error.userNotExists");
		}
	}

}
