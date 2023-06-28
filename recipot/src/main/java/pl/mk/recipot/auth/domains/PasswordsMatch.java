package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.dtos.UserRegisterDto;

public class PasswordsMatch {
	
	public Boolean execute(UserRegisterDto userRegisterDto) {
		if (userRegisterDto.password.equals(userRegisterDto.matchingPassword)) {
			return true;
		}
		throw new RuntimeException();
	}

}
