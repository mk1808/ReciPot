package pl.mk.recipot.auth.facades;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import pl.mk.recipot.auth.configs.JwtAuthenticationEntryPoint;
import pl.mk.recipot.auth.services.IAuthService;
import pl.mk.recipot.commons.models.AppUser;

@Service
@Slf4j
public class AuthFacade implements IAuthFacade {
	private IAuthService authService;

	public AuthFacade(@Lazy IAuthService authService) {
		super();
		this.authService = authService;
	}

	@Override
	public AppUser getCurrentUser() {
		try {
			return authService.getCurrentUser();
		} catch(Exception e) {
			log.warn("Exception during get current user: " + e.getMessage());
			return null;
		}
	}
}
