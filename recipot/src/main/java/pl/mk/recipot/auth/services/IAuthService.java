package pl.mk.recipot.auth.services;

import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.servlet.http.HttpServletResponse;
import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.JWTDto;
import pl.mk.recipot.commons.dtos.UserLoginDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;

public interface IAuthService {

	AppUser register(UserRegisterDto userRegisterDto);

	AppUser getCurrentUser();

	JWTDto login(UserLoginDto userLogin, HttpServletResponse response);

	PasswordEncoder getEncoder();
}
