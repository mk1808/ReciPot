package pl.mk.recipot.commons.exceptions;

public class ForbiddenException extends RuntimeException {


	private static final long serialVersionUID = 4650953311998188164L;
	private static final String DEFAULT_MESSAGE = "Access forbidden";

	
	public ForbiddenException() {
		super(DEFAULT_MESSAGE);
	}
	
	public ForbiddenException(String message) {
		super(message);
	}

}
