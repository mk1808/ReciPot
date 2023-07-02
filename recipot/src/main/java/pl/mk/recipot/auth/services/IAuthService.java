package pl.mk.recipot.auth.services;

import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;


public interface IAuthService {
	
	AppUser register(UserRegisterDto userRegisterDto);
	AppUser getCurrentUser();
	void changePassword(ChangePasswordDto changePasswordDto);
}
