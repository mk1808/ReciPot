package pl.mk.recipot.auth.services;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;


public interface IAuthService {
	
	AppUser register(UserRegisterDto userRegisterDto);

}
