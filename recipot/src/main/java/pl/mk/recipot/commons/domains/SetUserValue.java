package pl.mk.recipot.commons.domains;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;

public class SetUserValue {
	public <T extends IUserRelated> T execute(T userRelated, AppUser user) {
		userRelated.setUser(user);
		return userRelated;
	}
}
