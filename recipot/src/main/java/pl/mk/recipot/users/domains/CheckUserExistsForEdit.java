package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;

public class CheckUserExistsForEdit {
	
	public Boolean execute(AppUser user) {
		if (user == null) {
			throw new ForbiddenException("User does not exist");
		}
		return true;
	}

}
