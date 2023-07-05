package pl.mk.recipot.dictionaries.domains;

import java.util.List;

import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.models.HashTag;

public class CheckIfHashTagExists {
	public void execute(List<HashTag> hashTags) {
		if (!hashTags.isEmpty()) {
			throw new ConflictException("dictionaries.error.hashTagExists");
		}
	}
}
