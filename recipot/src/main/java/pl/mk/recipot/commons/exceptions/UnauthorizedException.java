package pl.mk.recipot.commons.exceptions;

public class UnauthorizedException extends RuntimeException {

	private static final long serialVersionUID = 4520087796633589065L;
	private static final String DEFAULT_MESSAGE = "User unauthorized";

	public UnauthorizedException() {
		super(DEFAULT_MESSAGE);
	}

	public UnauthorizedException(String message) {
		super(message);
	}

}
