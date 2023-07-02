package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;

public class CheckIfPasswordsMatch {

	public Boolean execute(UserRegisterDto userRegisterDto, ChangePasswordDto changePasswordDto) {
		if (userRegisterDto != null) {
			checkForRegister(userRegisterDto);
		}

		if (changePasswordDto != null) {
			checkForChange(changePasswordDto);
		}

		return true;
	}

	private void checkForRegister(UserRegisterDto userRegisterDto) {
		if (!userRegisterDto.password.equals(userRegisterDto.matchingPassword)) {
			throw new RuntimeException();
		}
	}

	private void checkForChange(ChangePasswordDto changePasswordDto) {
		if (!changePasswordDto.password.equals(changePasswordDto.matchingPassword)) {
			throw new RuntimeException();
		}
	}

}
