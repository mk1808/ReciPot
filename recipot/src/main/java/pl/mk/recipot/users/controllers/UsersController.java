package pl.mk.recipot.users.controllers;

import java.util.UUID;

import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.services.ICrudService;

@RestController
public class UsersController implements IUsersController {
	
	private ICrudService<AppUser> userCrudService;

	public UsersController(ICrudService<AppUser> userCrudService) {
		super();
		this.userCrudService = userCrudService;
	}

	@Override
	public AppUser update(UUID id,AppUser user) {
		return userCrudService.update(user, id);
	}

}