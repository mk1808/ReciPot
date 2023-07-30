package pl.mk.recipot.dictionaries.services;

import java.util.Set;

import pl.mk.recipot.commons.models.HashTag;

public interface IHashTagsService {

	Set<HashTag> saveMany(Set<HashTag> hashtags);

}
