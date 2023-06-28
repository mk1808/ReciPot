package pl.mk.recipot.users.facades;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.users.services.IUsersService;

@Service
public class UsersFacade implements IUsersFacade {

	private IUsersService usersService;
	private ICrudService<AppUser> usersCrudService;
	
	
	public UsersFacade(IUsersService usersService, ICrudService<AppUser> usersCrudService) {
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

}
