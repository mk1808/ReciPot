package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.AppUser;

public class CheckIfCurrentUser {
	
	public Boolean execute(AppUser currentUser, AppUser executingUser) {
		Boolean present = currentUser != null && currentUser.getId() !=null && 
				executingUser != null && executingUser.getId() != null;
		if (!(present && currentUser.getId().equals(executingUser.getId()))) {
			throw new ForbiddenException("You dont have access to edited user");
		}
		
		return true;
	}

}
