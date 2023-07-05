package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;

public class CheckIfUsersNotTheSame {
	
	public void execute(AppUser currentUser, AppUser executingUser) {
		boolean present = currentUser != null 
				&& currentUser.getId() !=null 
				&& executingUser != null 
				&& executingUser.getId() != null;
		boolean theSameUser = present && currentUser.getId().equals(executingUser.getId());
		if (!theSameUser) {
			throw new ForbiddenException("users.error.noAccessToUser");
		}
	}

}
