package pl.mk.recipot.auth.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;

@RestController
@RequestMapping("/api/auth")
public interface IAuthController {
	
	@PostMapping("/register")
	AppUser register(UserRegisterDto userRegisterDto, HttpServletRequest request);

}
