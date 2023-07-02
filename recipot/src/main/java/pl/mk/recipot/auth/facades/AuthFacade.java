package pl.mk.recipot.auth.facades;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.services.IAuthService;
import pl.mk.recipot.commons.models.AppUser;

@Service
public class AuthFacade implements IAuthFacade {
	private IAuthService authService;

	public AuthFacade(@Lazy IAuthService authService) {
		super();
		this.authService = authService;
	}

	@Override
	public AppUser getCurrentUser() {
		return authService.getCurrentUser();
	}

}
