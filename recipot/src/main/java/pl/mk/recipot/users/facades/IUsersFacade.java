package pl.mk.recipot.users.facades;

import pl.mk.recipot.commons.models.AppUser;

public interface IUsersFacade {
	AppUser save(AppUser appUser); 
	AppUser getUserByLogin(String login);
}
