package pl.mk.recipot.auth.domains;

import java.util.Collections;
import java.util.HashSet;

import org.springframework.security.crypto.password.PasswordEncoder;

import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;

public class CreateUser {
	public AppUser execute(UserRegisterDto dto, Role role, PasswordEncoder passwordEncoder) {
		return AppUser.builder()
		.email(dto.email)
		.login(dto.login)
		.password(passwordEncoder.encode(dto.password))
		.verified(false)
		.roles(Collections.singleton(role))
		.build();
	}

}
