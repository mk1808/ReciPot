package pl.mk.recipot.auth.domains;

import org.springframework.security.crypto.password.PasswordEncoder;

import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.models.AppUser;

public class UpdateUserPassword {
	
	public AppUser execute(AppUser oldUser, ChangePasswordDto changePasswordDto, PasswordEncoder passwordEncoder) {
		oldUser.setPassword(passwordEncoder.encode(changePasswordDto.password));
		return oldUser;

	}

}
