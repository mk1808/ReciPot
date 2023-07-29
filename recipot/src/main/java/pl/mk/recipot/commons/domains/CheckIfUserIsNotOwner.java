package pl.mk.recipot.commons.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;

public class CheckIfUserIsNotOwner {
	public void execute(AppUser user, IUserRelated userRelated) {
		boolean userIsOwner = new GetIsUserOwner().execute(user, userRelated);
		if (!userIsOwner) {
			throw new ForbiddenException("commons.error.userNotOwner");
		}
	}
}
