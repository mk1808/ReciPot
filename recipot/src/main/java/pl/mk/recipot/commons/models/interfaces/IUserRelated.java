package pl.mk.recipot.commons.models.interfaces;

import pl.mk.recipot.commons.models.AppUser;

public interface IUserRelated {
	AppUser getUser();

	void setUser(AppUser user);
}
