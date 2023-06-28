package pl.mk.recipot.auth.services;

import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;


public interface IAuthService {
	
	AppUser register(UserRegisterDto userRegisterDto);

}
