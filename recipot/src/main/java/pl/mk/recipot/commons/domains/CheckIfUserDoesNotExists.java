package pl.mk.recipot.commons.domains;

import pl.mk.recipot.commons.exceptions.BadRequestException;

public class CheckIfUserDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new BadRequestException("auth.error.userNotExists");
	}
}
