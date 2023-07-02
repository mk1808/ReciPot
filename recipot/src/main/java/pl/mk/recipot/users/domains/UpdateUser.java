package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.models.AppUser;

public class UpdateUser {
	
	public AppUser execute(AppUser oldUser, AppUser newUser) {
		
		oldUser.setEmail(newUser.getEmail());
		oldUser.setLogin(newUser.getLogin());
		oldUser.setAvatarImageSrc(newUser.getAvatarImageSrc());
		oldUser.setSelfDescription(newUser.getSelfDescription());
		return oldUser;

	}

}
