package pl.mk.recipot.users.facades;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;

public interface IUsersFacade {
	AppUser save(AppUser appUser); 
	AppUser getUserByLogin(String login);
	Role getRoleByName(String name);
}
