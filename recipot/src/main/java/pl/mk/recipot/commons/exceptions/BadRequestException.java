package pl.mk.recipot.commons.exceptions;

public class BadRequestException extends RuntimeException {


	private static final long serialVersionUID = 4650953311998188164L;
	private static final String DEFAULT_MESSAGE = "Bad Request";

	
	public BadRequestException() {
		super(DEFAULT_MESSAGE);
	}
	
	public BadRequestException(String message) {
		super(message);
	}
}
