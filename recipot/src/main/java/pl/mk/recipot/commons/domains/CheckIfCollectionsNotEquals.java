package pl.mk.recipot.commons.domains;

import java.util.Collection;

public abstract class CheckIfCollectionsNotEquals {
	public <T, V> void execute(Collection<T> collection1, Collection<V> collection2) {
		if (collection1 == null || collection2 == null || collection1.size() != collection2.size()) {
			throw getException();
		}
	}

	protected abstract RuntimeException getException();
}
