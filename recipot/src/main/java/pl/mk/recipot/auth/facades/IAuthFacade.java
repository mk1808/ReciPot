package pl.mk.recipot.auth.facades;

import org.springframework.security.crypto.password.PasswordEncoder;

import pl.mk.recipot.commons.models.AppUser;

public interface IAuthFacade {
	AppUser getCurrentUser();

	PasswordEncoder getEncoder();
}
