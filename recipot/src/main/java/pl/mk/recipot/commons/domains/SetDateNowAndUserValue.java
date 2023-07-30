package pl.mk.recipot.commons.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;
import pl.mk.recipot.commons.models.interfaces.IWithDate;

public class SetDateNowAndUserValue {
	public <T extends IUserRelated & IWithDate> T execute(T userRelated, AppUser user) {
		userRelated.setUser(user);
		userRelated.setDate(new Date());
		return userRelated;
	}
}
