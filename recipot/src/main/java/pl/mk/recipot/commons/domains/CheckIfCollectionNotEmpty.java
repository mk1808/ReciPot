package pl.mk.recipot.commons.domains;

import java.util.Collection;

public abstract class CheckIfCollectionNotEmpty {
	public <T> void execute(Collection<T> collection) {
		if (collection == null || !collection.isEmpty()) {
			throw getException();
		}
	}

	protected abstract RuntimeException getException();
}
