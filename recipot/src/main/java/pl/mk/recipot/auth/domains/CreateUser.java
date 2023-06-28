package pl.mk.recipot.auth.domains;

import org.springframework.security.crypto.password.PasswordEncoder;

import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;

public class CreateUser {
	public AppUser execute(UserRegisterDto dto, PasswordEncoder passwordEncoder) {
		return AppUser.builder()
		.email(dto.email)
		.login(dto.login)
		.password(passwordEncoder.encode(dto.password))
		.verified(false)
		.build();
	}

}
