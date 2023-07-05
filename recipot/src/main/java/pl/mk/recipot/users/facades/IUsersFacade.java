package pl.mk.recipot.users.facades;

import java.util.UUID;

import pl.mk.recipot.commons.enums.RoleType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;

public interface IUsersFacade {
	AppUser save(AppUser appUser); 
	AppUser getUserByLogin(String login);
	AppUser getUserById(UUID id);
	Role getRoleByName(RoleType name);
	int getAllUsersCount();
}
