package pl.mk.recipot.commons.domains;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;

public class GetIsUserOwner {
	public boolean execute(AppUser user, IUserRelated userRelated) {
		boolean usersExist = user != null && userRelated != null;
		return usersExist && user.getId().equals(userRelated.getUser().getId());
	}
}
