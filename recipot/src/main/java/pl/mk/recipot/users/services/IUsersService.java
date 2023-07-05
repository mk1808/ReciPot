package pl.mk.recipot.users.services;

import pl.mk.recipot.commons.enums.RoleType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;

public interface IUsersService {
	AppUser getUserByLogin(String username);
	Role getRoleByName(RoleType name);
	int getAllUsersCount();
}
