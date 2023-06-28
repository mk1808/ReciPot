package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.models.AppUser;

public class CheckUser {
	
	public Boolean execute(AppUser user) {
		if (user != null) {
			//throw
		}
		return true;
	}

}
