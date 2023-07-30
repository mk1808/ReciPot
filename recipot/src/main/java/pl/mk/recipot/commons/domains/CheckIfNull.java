package pl.mk.recipot.commons.domains;

public abstract class CheckIfNull {
	public <T> void execute(T object) {
		if (object == null) {
			throw getException();
		}
	}

	protected abstract RuntimeException getException();
}
