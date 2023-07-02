package pl.mk.recipot.auth.facades;

import pl.mk.recipot.commons.models.AppUser;

public interface IAuthFacade {
	AppUser getCurrentUser();
}
