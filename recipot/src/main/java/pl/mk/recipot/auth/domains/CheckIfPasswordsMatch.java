package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.exceptions.BadRequestException;

public class CheckIfPasswordsMatch {

	public Boolean execute(UserRegisterDto userRegisterDto) {
		checkForRegister(userRegisterDto);
		return true;
	}
	
	public Boolean execute(ChangePasswordDto changePasswordDto) {
		checkForChange(changePasswordDto);
		return true;
	}

	private void checkForRegister(UserRegisterDto userRegisterDto) {
		if (!userRegisterDto.password.equals(userRegisterDto.matchingPassword)) {
			throw new BadRequestException("Passwords are not equal");
		}
	}

	private void checkForChange(ChangePasswordDto changePasswordDto) {
		if (!changePasswordDto.password.equals(changePasswordDto.matchingPassword)) {
			throw new BadRequestException("Passwords are not equal");
		}
	}

}
