package pl.mk.recipot.dictionaries.domains;

import java.util.List;

import pl.mk.recipot.commons.models.HashTag;

public class GetHashTagIfExists {
	public HashTag execute(List<HashTag> exisitingTags) {
		return exisitingTags.isEmpty() ? null : exisitingTags.get(0);
	}

}
