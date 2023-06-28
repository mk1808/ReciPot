package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.dtos.UserRegisterDto;

public class CheckIfPasswordsMatch {
	
	public Boolean execute(UserRegisterDto userRegisterDto) {
		if (!userRegisterDto.password.equals(userRegisterDto.matchingPassword)) {
			throw new RuntimeException();
		}
		
		return true;
	}

}
