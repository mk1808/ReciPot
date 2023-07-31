package pl.mk.recipot.users.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.ForbiddenException;

public class CheckIfUserDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new ForbiddenException("users.error.userNotFound");
	}
}
