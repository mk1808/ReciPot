package pl.mk.recipot.users.facades;

import java.util.UUID;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.enums.RoleType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.users.services.IUsersService;

@Service
public class UsersFacade implements IUsersFacade {

	private IUsersService usersService;
	private ICrudService<AppUser> usersCrudService;

	public UsersFacade(@Lazy IUsersService usersService, @Lazy ICrudService<AppUser> usersCrudService) {
		super();
		this.usersService = usersService;
		this.usersCrudService = usersCrudService;
	}

	@Override
	public AppUser save(AppUser appUser) {
		return usersCrudService.save(appUser);
	}

	@Override
	public AppUser getUserByLogin(String login) {
		return usersService.getUserByLogin(login);
	}

	@Override
	public Role getRoleByName(RoleType name) {
		return usersService.getRoleByName(name);
	}

	@Override
	public AppUser getUserById(UUID id) {
		return usersCrudService.get(id);
	}

	@Override
	public int getAllUsersCount() {
		return usersService.getAllUsersCount();
	}

}
