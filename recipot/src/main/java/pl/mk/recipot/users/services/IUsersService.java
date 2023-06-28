package pl.mk.recipot.users.services;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;

public interface IUsersService {
	AppUser getUserByLogin(String username);
	Role getRoleByName(String name);

}
