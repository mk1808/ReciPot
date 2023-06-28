package pl.mk.recipot.users.facades;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.users.services.IUsersService;

@Service
public class UsersFacade implements IUsersFacade {

	private IUsersService usersService;
	
	
	public UsersFacade(IUsersService usersService) {
		super();
		this.usersService = usersService;
	}

	@Override
	public AppUser save(AppUser appUser) {
		return usersService.save(appUser);
	}

	@Override
	public AppUser getUserByLogin(String login) {
		return usersService.getUserByLogin(login);
	}

}
