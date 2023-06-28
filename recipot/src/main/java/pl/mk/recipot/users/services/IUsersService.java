package pl.mk.recipot.users.services;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.services.ICrudService;

public interface IUsersService {
	AppUser getUserByLogin(String username);

}
