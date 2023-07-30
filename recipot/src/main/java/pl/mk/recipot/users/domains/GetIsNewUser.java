package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.models.AppUser;

public class IsNewUser {
	public boolean execute(AppUser user) {
		return user.getId() == null;
	}
}
