package pl.mk.recipot.users.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.users.services.IUsersService;

@RestController
public class UsersController implements IUsersController {

	private ICrudService<AppUser> userCrudService;
	private IUsersService usersService;

	public UsersController(ICrudService<AppUser> userCrudService, IUsersService usersService) {
		super();
		this.userCrudService = userCrudService;
		this.usersService = usersService;
	}

	@Override
	public ResponseEntity<Response<AppUser>> update(UUID id, AppUser user) {
		return new OkResponseFactory().createResponse(userCrudService.update(user, id));
	}
	
	@Override
	public ResponseEntity<Response<Void>> changePassword(ChangePasswordDto changePasswordDto) {
		usersService.changePassword(changePasswordDto);
		return new OkMessageResponseFactory().createResponse("auth.success.passwordChanged");
	}

}