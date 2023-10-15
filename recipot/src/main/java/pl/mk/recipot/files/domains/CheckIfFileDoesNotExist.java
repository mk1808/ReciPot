package pl.mk.recipot.files.domains;

import pl.mk.recipot.commons.domains.CheckIfNull;
import pl.mk.recipot.commons.exceptions.NotFoundException;

public class CheckIfFileDoesNotExist extends CheckIfNull {

	@Override
	protected RuntimeException getException() {
		return new NotFoundException("files.error.fileNotFound");
	}
}