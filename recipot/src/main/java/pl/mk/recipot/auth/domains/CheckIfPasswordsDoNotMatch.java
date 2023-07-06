package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.exceptions.BadRequestException;

public class CheckIfPasswordsDoNotMatch {

	public void execute(UserRegisterDto userRegisterDto) {
		if (!userRegisterDto.password.equals(userRegisterDto.matchingPassword)) {
			throw new BadRequestException("auth.error.passwordsNotEqual");
		}
	}
	
	public void execute(ChangePasswordDto changePasswordDto) {
		if (!changePasswordDto.password.equals(changePasswordDto.matchingPassword)) {
			throw new BadRequestException("auth.error.passwordsNotEqual");
		}
	}

}
