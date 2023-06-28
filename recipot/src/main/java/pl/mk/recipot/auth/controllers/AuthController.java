package pl.mk.recipot.auth.controllers;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import pl.mk.recipot.auth.services.IAuthService;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
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

}
