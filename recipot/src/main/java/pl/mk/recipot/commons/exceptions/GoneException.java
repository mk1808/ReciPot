package pl.mk.recipot.commons.exceptions;

public class GoneException extends RuntimeException {

	private static final long serialVersionUID = 4520087796633589065L;
	private static final String DEFAULT_MESSAGE = "Gone";

	public GoneException() {
		super(DEFAULT_MESSAGE);
	}

	public GoneException(String message) {
		super(message);
	}

}
