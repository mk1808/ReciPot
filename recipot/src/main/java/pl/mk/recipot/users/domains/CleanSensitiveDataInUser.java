package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.models.AppUser;

public class CleanSensitiveDataInUser {
	public AppUser execute(AppUser user) {
		user.setPassword(null);
		return user;
	}

}
