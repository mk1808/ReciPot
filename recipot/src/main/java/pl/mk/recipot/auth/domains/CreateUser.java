package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;

public class CreateUser {
	public AppUser execute(UserRegisterDto dto, String password) {
		return AppUser.builder()
		.email(dto.email)
		.login(dto.login)
		.password(password)
		.build();
		
	}
	
	private String getPass(String password) {
		return password;
		//passwordEncoder.encode(userModel.getPassword())
	}

}
