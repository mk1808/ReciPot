package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.models.AppUser;

public class CheckIfUserExists {
	
	public Boolean execute(AppUser user) {
		if (user == null) {
			throw new RuntimeException();
		}
		return true;
	}

}
