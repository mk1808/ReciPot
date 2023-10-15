package pl.mk.recipot.auth.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.models.AppUser;

@RequestMapping("/api/auth")
public interface IAuthController {

	@PostMapping("/register")
	AppUser register(@RequestBody @Valid UserRegisterDto userRegisterDto, HttpServletRequest request);

	@PatchMapping("/changePassword")
	ResponseEntity<Response<Void>> changePassword(@RequestBody @Valid ChangePasswordDto changePasswordDto);

	@GetMapping("/whoAmI")
	ResponseEntity<Response<AppUser>> whoAmI();
	
	@GetMapping("/logout")
	public ResponseEntity<Response<Void>> logout(HttpServletResponse response);

}
