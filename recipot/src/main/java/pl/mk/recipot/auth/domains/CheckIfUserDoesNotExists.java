package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.BadRequestException;

public class CheckIfUserDoesNotExists extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new BadRequestException("auth.error.userNotExists");
	}
}
