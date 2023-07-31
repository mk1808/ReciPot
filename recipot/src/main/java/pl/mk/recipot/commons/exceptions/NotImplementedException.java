package pl.mk.recipot.commons.exceptions;

public class NotImplementedException extends RuntimeException {

	private static final long serialVersionUID = 4520087796633589065L;
	private static final String DEFAULT_MESSAGE = "Not Implemented";

	public NotImplementedException() {
		super(DEFAULT_MESSAGE);
	}

	public NotImplementedException(String message) {
		super(message);
	}

}
