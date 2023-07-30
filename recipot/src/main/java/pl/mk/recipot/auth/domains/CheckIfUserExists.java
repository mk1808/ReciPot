package pl.mk.recipot.auth.domains;

import pl.mk.recipot.commons.domains.CheckIfNotNull;
import pl.mk.recipot.commons.exceptions.BadRequestException;

public class CheckIfUserExists extends CheckIfNotNull {

	@Override
	protected RuntimeException getException() {
		return new BadRequestException("auth.error.userExists");
	}
}
