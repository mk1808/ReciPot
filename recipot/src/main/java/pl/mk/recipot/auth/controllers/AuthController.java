package pl.mk.recipot.auth.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import pl.mk.recipot.auth.services.IAuthService;
import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.AppUser;

@RestController
public class AuthController implements IAuthController {
	
	private IAuthService authService;

	public AuthController(IAuthService authService) {
		super();
		this.authService = authService;
	}

	@Override
	public AppUser register(@RequestBody @Valid UserRegisterDto userRegisterDto, HttpServletRequest request) {
		return authService.register(userRegisterDto);
	}

	@Override
	public ResponseEntity<Response<Void>> changePassword(@RequestBody @Valid ChangePasswordDto changePasswordDto) {
		authService.changePassword(changePasswordDto);
		return new OkMessageResponseFactory().createResponse("auth.success.passwordChanged");
	}

}
