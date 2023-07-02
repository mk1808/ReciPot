package pl.mk.recipot.commons.exceptions;

public class ConflictException extends RuntimeException {

	private static final long serialVersionUID = 4650953311998188164L;
	private static final String DEFAULT_MESSAGE = "Conflict";

	
	public ConflictException() {
		super(DEFAULT_MESSAGE);
	}
	
	public ConflictException(String message) {
		super(message);
	}
}
