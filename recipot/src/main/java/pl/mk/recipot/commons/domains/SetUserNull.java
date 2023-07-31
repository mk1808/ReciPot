package pl.mk.recipot.commons.domains;

import pl.mk.recipot.commons.models.interfaces.IUserRelated;

public class SetUserNull {
	public <T extends IUserRelated> T execute(T userRelated) {
		userRelated.setUser(null);
		return userRelated;
	}
}
