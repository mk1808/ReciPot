package pl.mk.recipot.auth.services;

import jakarta.servlet.http.HttpServletResponse;
import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.JWTDto;
import pl.mk.recipot.commons.dtos.UserLoginDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;

public interface IAuthService {

	AppUser register(UserRegisterDto userRegisterDto);

	AppUser getCurrentUser();

	void changePassword(ChangePasswordDto changePasswordDto);

	JWTDto login(UserLoginDto userLogin, HttpServletResponse response);
}
