package pl.mk.recipot.commons.exceptions;

public class NotFoundException extends RuntimeException {

	private static final long serialVersionUID = 4520087796633589065L;
	private static final String DEFAULT_MESSAGE = "Not Found";

	public NotFoundException() {
		super(DEFAULT_MESSAGE);
	}

	public NotFoundException(String message) {
		super(message);
	}

}
