package pl.mk.recipot.commons.domains;

import java.util.List;

public class GetFirstOrNull {
	public <T> T execute(List<T> objects) {
		return objects.isEmpty() ? null : objects.get(0);
	}
}
