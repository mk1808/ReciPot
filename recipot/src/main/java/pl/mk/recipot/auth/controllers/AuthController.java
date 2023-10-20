package pl.mk.recipot.auth.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pl.mk.recipot.auth.services.IAuthService;
import pl.mk.recipot.commons.dtos.JWTDto;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.dtos.UserLoginDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.AppUser;

@RestController
public class AuthController implements IAuthController {

	private final IAuthService authService;

	public AuthController(IAuthService authService) {
		super();
		this.authService = authService;
	}

	@Override
	public AppUser register(UserRegisterDto userRegisterDto, HttpServletRequest request) {
		return authService.register(userRegisterDto);
	}

	@Override
	public ResponseEntity<Response<AppUser>> whoAmI() {
		return new OkResponseFactory().createResponse(authService.getCurrentUser());
	}

	@Override
	public ResponseEntity<Response<Void>> logout(HttpServletResponse response) {
		Cookie jwtCookie = new Cookie("token", null);
		jwtCookie.setPath("/");
		response.addCookie(jwtCookie);
		return new OkMessageResponseFactory().createResponse("auth.success.loggedOut");
	}

	@Override
	public ResponseEntity<Response<JWTDto>> login(UserLoginDto userLogin, HttpServletResponse response) {

		JWTDto jwt = authService.login(userLogin, response);
		Cookie jwtCookie = new Cookie("token", jwt.token);
		jwtCookie.setMaxAge(600000);
		jwtCookie.setPath("/");
		response.addCookie(jwtCookie);
		return new OkResponseFactory().createResponse(jwt);
	}

}
